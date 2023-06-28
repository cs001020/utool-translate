# Utools 翻译小插件

这是一款基于 Utools 的翻译小插件，可以方便地进行文本翻译操作。

首次自己配置webpack以及使用ts进行开发，有任何问题欢迎各位大佬指出。

## 注意事项

- 本插件使用的是有道翻译接口，需要api密钥，并且保持网络连接。支持的翻译语言包括但不限于中文、英文、日文、韩文、法文等。
- api密钥获取参考[有道智云](https://ai.youdao.com/doc.s#guide)

## 安装

可以直接下载打包完成的插件或下载源码自行进行构建安装

- **直接安装使用**
  - 从 [release](https://github.com/cs001020/utool-translate/releases)中下载最新的upx 插件文件
  - 呼出 utools 输入框，将刚刚下载的 upx 插件拖入输入框安装即可
- **构建 - 运行**
  - `npm install`
  - `npm run build`
  - `uTools 开发者工具` 中将 `dist/plugin.json` 加入到本地开发

## 使用方法

- 在 Utools 中输入关键词 `设置`或者`setting`打开设置页面对api密钥进行设置
  
  ![setting。png](https://raw.githubusercontent.com/cs001020/images/master/translate/setting.png)
- 在 Utools 中输入关键词 `翻译`，然后输入需要翻译的文本。(任何文本类型输入也可唤起插件)
  
  ![translate.png](https://raw.githubusercontent.com/cs001020/images/master/translate/translate.png)

- 选择任意条目，结果将自动复制到剪切板

## 贡献

欢迎对本插件提出改进意见和建议。如果您发现了 bug 或者有新功能的想法，请在本项目的 [GitHub 仓库](https://github.com/cs001020/utool-translate)中提交 [issue](https://github.com/cs001020/utool-translate/issues) 或者 pull request。

## 联系方式

如有任何问题或疑问，请通过以下方式联系我：

- 邮箱：1006596575@qq.com
- GitHub：[cs001020](https://github.com/cs001020)

