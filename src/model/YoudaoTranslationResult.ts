export interface YoudaoTranslationResult {
    // 错误代码
    errorCode: string,
    // 翻译结果
    translation: string[]
    // 基本词典，查词时才有
    basic?: { explains: string[] }
    // 网络释义，该结果不一定存在
    web?: { key: string, value: string[] }[]

}


