"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisDevUtil_1 = require("../util/IrisDevUtil");
class IrisFalseClass {
    native_class_name_define() {
        return "FalseClass";
    }
    native_super_class_define() {
        return IrisDevUtil_1.IrisDev.get_class("Object");
    }
    native_upper_module_define() {
        return undefined;
    }
    native_alloc() {
        return new IrisFalseClassTag();
    }
    native_class_define() {
        return [];
    }
}
exports.IrisFalseClass = IrisFalseClass;
class IrisFalseClassTag {
}
exports.IrisFalseClassTag = IrisFalseClassTag;
//# sourceMappingURL=IrisFalseClass.js.map