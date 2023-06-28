import {settingWindow} from "../../utils/browserWindow/setting";
import {TplFeature} from "../../types/utools";

const settingFeature: TplFeature = {
    mode: "none",
    args: {
        placeholder: '设置',
        enter: () => {
            settingWindow()
        }
    }
}

export default settingFeature
