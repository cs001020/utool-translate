import HttpUtil from "../../utils/http";
import {YoudaoTranslationResult} from "../../model/YoudaoTranslationResult";
import YoudaoApiParam from "../../model/YoudaoApiParam";


const url:string='https://openapi.youdao.com/api'

/**
 * 翻译文本
 * @param param
 */
export function translate(param:YoudaoApiParam) {
    return HttpUtil.get<YoudaoTranslationResult>(url, param)
}

