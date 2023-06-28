import {strIsBlank} from "../commons/StrUtils";

/**
 * 根据key 从db中获取内容（字符串） 返回数值类型
 * 获取为空 返回默认值
 * @param key
 * @param defaultValue
 */
export function getWithDefaultValueAsNumber(key: string, defaultValue: number) {
    const item = utools.dbStorage.getItem(key);
    if (strIsBlank(item)) {
        return defaultValue
    }
    return parseInt(item)
}

/**
 * 根据key 从db中获取内容（对象 数组等） 泛型
 * 获取为空 返回默认值
 * @param key
 * @param defaultValue
 */
export function getWithDefaultValueAsT<T>(key: string, defaultValue: T): T {
    const item = utools.dbStorage.getItem(key);
    if (item === null || item === undefined) {
        return defaultValue
    }
    return item
}
