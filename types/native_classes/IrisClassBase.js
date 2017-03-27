"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisDevUtil_1 = require("../util/IrisDevUtil");
class IrisClassBase {
    native_class_name_define() {
        return "Class";
    }
    native_super_class_define() {
        return IrisDevUtil_1.IrisDev.get_class("Object");
    }
    native_upper_module_define() {
        return undefined;
    }
    native_alloc() {
        return new IrisClassBaseTag();
    }
    native_class_define() {
        return [];
    }
}
exports.IrisClassBase = IrisClassBase;
class IrisClassBaseTag {
    constructor() {
        this.class_object = undefined;
    }
}
exports.IrisClassBaseTag = IrisClassBaseTag;
//# sourceMappingURL=IrisClassBase.js.map