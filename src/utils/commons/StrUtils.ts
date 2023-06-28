/**
 * 判断字符串为空
 * @param str
 */
export function strIsBlank(str: string): boolean {
    return str === null || str === undefined || str.trim().length === 0
}

/**
 * 判断字符串为非空
 * @param str
 */
export function strIsNotBlank(str: string): boolean {
    return !(str === null || str === undefined || str.trim().length === 0)
}

/**
 * 判断字符串为中文
 * @param str
 */
export function strIsChinese(str: string): boolean {
    // 使用Unicode范围匹配中文字符
    const regExp = /^[\u4e00-\u9fa5]+$/;
    return regExp.test(str);
}
