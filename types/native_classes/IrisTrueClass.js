"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisDevUtil_1 = require("../util/IrisDevUtil");
class IrisTrueClass {
    native_class_name_define() {
        return "TrueClass";
    }
    native_super_class_define() {
        return IrisDevUtil_1.IrisDev.get_class("Object");
    }
    native_upper_module_define() {
        return undefined;
    }
    native_alloc() {
        return new IrisTrueClassTag();
    }
    native_class_define() {
        return [];
    }
}
exports.IrisTrueClass = IrisTrueClass;
class IrisTrueClassTag {
}
exports.IrisTrueClassTag = IrisTrueClassTag;
//# sourceMappingURL=IrisTrueClass.js.map