"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisDevUtil_1 = require("../util/IrisDevUtil");
class IrisNilClass {
    native_class_name_define() {
        return "NilClass";
    }
    native_super_class_define() {
        return IrisDevUtil_1.IrisDev.get_class("Object");
    }
    native_upper_module_define() {
        return undefined;
    }
    native_alloc() {
        return new IrisNilClassTag();
    }
    native_class_define() {
        return [];
    }
}
exports.IrisNilClass = IrisNilClass;
class IrisNilClassTag {
}
exports.IrisNilClassTag = IrisNilClassTag;
//# sourceMappingURL=IrisNilClass.js.map