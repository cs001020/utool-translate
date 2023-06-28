const path = require('path')//引入内置path方便得到绝对路径
const CopyWebpackPlugin = require('copy-webpack-plugin')
const outputPath = path.resolve(__dirname, "./dist")


module.exports = {
    mode: 'development',//生产模式
    entry: './src/preload.ts',//入口文件地址
    output: {
        path: outputPath,//出口文件，即打包后的文件存放地址
        filename: 'preload.js',//文件名
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.cjs', '.json'] //配置文件引入时省略后缀名
    },
    module: {
        rules: [
            {
                test: /\.ts$/, //匹配规则 以ts结尾的文件
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader' //对应文件采用ts-loader进行编译
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({patterns: [{from: path.resolve(__dirname, "./public"), to: outputPath}]})
    ],
}
