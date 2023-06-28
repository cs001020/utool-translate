export default interface YoudaoApiParam {
    // 待翻译文本
    q: string,
    // 应用ID
    appKey: string,
    // uuid，唯一通用识别码
    salt: string,
    // 源语言  可设置为auto
    from: string,
    // 目标语言
    to: string,
    // 签名 sha256(应用ID+input+salt+curtime+应用密钥)
    sign: string,
    // 签名类型 v3
    signType: string ,
    // 当前UTC时间戳(秒)
    curtime: string,
}
