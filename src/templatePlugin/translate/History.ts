import {CallbackListItem} from "../../types/utools";
import {getWithDefaultValueAsNumber, getWithDefaultValueAsT} from "../../utils/db";
import {TranslateSetting} from "../../model/SettingKeyEmums";

export class History {
    private static readonly HISTORY_LIST_KEY: string = "history_list"
    private static readonly DEFAULT_HISTORY_LIST_SIZE: number = 12


    public static insert(element: CallbackListItem) {
        const historyList = getWithDefaultValueAsT<CallbackListItem[]>(this.HISTORY_LIST_KEY, []);
        // 存在相同记录 不存入
        for (let callbackListItem of historyList) {
            if (callbackListItem.title === element.title) {
                return
            }
        }
        // 尝试删除
        this.tryDeleteMore(historyList)
        // 往开头插入
        historyList.unshift({
            title: element.title,
            description: '[搜索记录]'
        });
        utools.dbStorage.setItem(this.HISTORY_LIST_KEY, historyList)
    }

    /**
     * 尝试删除多余内容
     * @private
     */
    private static tryDeleteMore(historyList: CallbackListItem[]) {
        const maxLength = getWithDefaultValueAsNumber(TranslateSetting.HISTORY_LIST__SIZE_KEY, this.DEFAULT_HISTORY_LIST_SIZE);
        if (historyList.length >= maxLength) {
            historyList.pop(); // 右删除
        } else {
            return
        }
        this.tryDeleteMore(historyList)
    }

    /**
     * 获取历史记录
     */
    public static get(): CallbackListItem[] {
        return getWithDefaultValueAsT<CallbackListItem[]>(this.HISTORY_LIST_KEY, []);
    }
}
