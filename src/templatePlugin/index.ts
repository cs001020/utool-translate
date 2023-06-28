import {TemplatePlugin} from "../types/utools";

import translateFeature from "./translate";
import settingFeature from "./setting";


/**
 * 模版插件
 */
const templatePlugin: TemplatePlugin = {
    translate: translateFeature,
    setting: settingFeature
}

export default templatePlugin
