"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisDevUtil_1 = require("../util/IrisDevUtil");
class IrisMethodBase {
    native_class_name_define() {
        return "Method";
    }
    native_super_class_define() {
        return IrisDevUtil_1.IrisDev.get_class("Object");
    }
    native_upper_module_define() {
        return undefined;
    }
    native_alloc() {
        return new IrisMethodBaseTag();
    }
    native_class_define() {
        return [];
    }
}
exports.IrisMethodBase = IrisMethodBase;
class IrisMethodBaseTag {
    constructor() {
        this.method = undefined;
    }
}
exports.IrisMethodBaseTag = IrisMethodBaseTag;
//# sourceMappingURL=IrisMethodBase.js.map