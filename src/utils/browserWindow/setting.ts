/**
 * 打开设置页面
 */
export const settingWindow = () => {
    utools.createBrowserWindow('setting.html', {
            show: true,
            title: '测试窗口'
        }
    )
}
