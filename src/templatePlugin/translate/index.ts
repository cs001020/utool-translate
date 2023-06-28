import {translate} from "../../api/translate";
import {CallbackListItem, TplFeature} from "../../types/utools";
import {History} from "./History";
import {YoudaoTranslationResult} from "../../model/YoudaoTranslationResult";
import YoudaoApiParam from "../../model/YoudaoApiParam";
import {YoudaoSetting, TranslateSetting} from "../../model/SettingKeyEmums";
import {strIsBlank, strIsChinese} from "../../utils/commons/StrUtils";
import CryptoJS from "crypto-js";
import {settingWindow} from "../../utils/browserWindow/setting";
import {getWithDefaultValueAsNumber} from "../../utils/db";


let time: number;

/**
 * 根据文本生成api请求参数
 * 输入中文文本翻译为英文
 * 非中文文本翻译为中文
 * 获取密钥失败返回undefined
 * @param text
 */
function generateYoudaoApiParam(text: string): YoudaoApiParam | undefined {
    // 获取密钥
    const appKey = utools.dbStorage.getItem(YoudaoSetting.ID);
    const key = utools.dbStorage.getItem(YoudaoSetting.KEY);//注意：暴露appSecret，有被盗用造成损失的风险
    if (strIsBlank(appKey) || strIsBlank(key)) {
        return undefined;
    }
    // 使用时间戳当作uuid
    const salt = (new Date).getTime().toString();
    // 当前UTC时间戳(秒)
    const curtime = Math.round(new Date().getTime() / 1000).toString();
    //生成源语言 目标语言（类型代码）
    let from = 'zh-CHS';
    let to = 'en';
    if (!strIsChinese(text)) {
        from = 'auto';
        to = 'zh-CHS';
    }
    // 生成签名
    const str1 = appKey + truncate(text) + salt + curtime + key;
    const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
    return {
        q: text,
        appKey: appKey,
        salt: salt,
        from: from,
        to: to,
        sign: sign,
        signType: "v3",
        curtime: curtime,
    }
}

/**
 * 签名 input 生成
 * 详细请参考官方文档
 * @param q
 */
function truncate(q: string) {
    const len = q.length;
    if (len <= 20) return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
}

/**
 * 根据api响应生成CallbackListItem
 * @param data
 */
function generateCallbackListItem(data: YoudaoTranslationResult): CallbackListItem[] {
    const {translation, basic, web} = data
    const res: CallbackListItem[] = []
    for (let string of translation) {
        res.push({
            title: string,
            description: '[翻译结果]',
        })
    }
    if (basic) {
        for (let explain of basic.explains) {
            res.push({
                title: explain,
                description: '[基本词典]',
            })
        }
    }
    if (web) {
        for (let webElement of web) {
            for (let string1 of webElement.value) {
                res.push({
                    title: string1,
                    description: `[网络释义]${webElement.key}`,
                })
            }
        }
    }
    return res;
}

const translateFeature: TplFeature = {
    mode: 'list',
    args: {
        placeholder: '请输入',
        enter: (action, callbackSetList) => {
            // 清空翻译防抖 求稳而已
            clearTimeout(time)
            // 任意字符进入翻译
            if (action.type === "over" && typeof action.payload === "string") {
                // 获取进入字符
                const payload = action.payload;
                // 延迟等待子输入框加载完成，并对子输入框的值进行设置，以触发search
                window.setTimeout(() => {
                    utools.setSubInputValue(payload)
                }, 10)
            }
            // 关键字进入 展示翻译历史
            if (action.type === "text") {
                callbackSetList(History.get())
            }
        },
        search: (action, searchWord: string, callbackSetList) => {
            // 清空翻译防抖 求稳而已
            clearTimeout(time)
            // 空值返回最近搜索
            const word = searchWord.trim();
            if (word === '') {
                callbackSetList(History.get())
                return
            }
            // 防抖翻译
            time = window.setTimeout(() => {
                // 根据文本生成请求参数
                const youdaoApiParam = generateYoudaoApiParam(word);
                // 参数为空 弹出设置页面
                if (youdaoApiParam === undefined) {
                    utools.showNotification("请设置密钥")
                    settingWindow()
                    return
                }
                // 调用翻译接口
                translate(youdaoApiParam).then(res => {
                    // 接口发生错误
                    if (res.errorCode !== "0") {
                        if (res.errorCode === "108") {
                            utools.showNotification("密钥异常，请重新设置")
                            settingWindow()
                            return
                        } else {
                            utools.showNotification(`请求发生异常，代码${res.errorCode}`)
                            return
                        }
                    }
                    // 根据接口响应生成列表需要的结果
                    const callbackListItems = generateCallbackListItem(res);
                    callbackSetList(callbackListItems)
                    // 保存历史记录
                    History.insert(callbackListItems[0])
                })
            }, getWithDefaultValueAsNumber(TranslateSetting.DEBOUNCE_TIME_KEY, 500))
        },
        select: (action, itemData) => {
            // 选中时候 复制并且关闭插件
            utools.hideMainWindow()
            utools.copyText(itemData.title)
            utools.outPlugin()
        }
    }
}

export default translateFeature
