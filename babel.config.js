module.exports = {
    // 预设
    presets: [
        ['@babel/preset-env', {
            useBuiltIns: 'entry',
            corejs: 3
        }],
        ['@babel/preset-typescript']
    ]
};
