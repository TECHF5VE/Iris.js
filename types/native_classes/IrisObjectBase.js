"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisMethod_1 = require("../core/IrisMethod");
class IrisObjectBase {
    native_class_name_define() {
        return "Object";
    }
    native_super_class_define() {
        return undefined;
    }
    native_upper_module_define() {
        return undefined;
    }
    native_alloc() {
        return new IrisObjectBaseTag();
    }
    native_class_define() {
        return [
            { method_name: "__format", native_method: IrisObjectBase.format, parameter_amount: 0, is_with_variable_parameter: true, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
        ];
    }
    static format(caller, parameters, variable_parameters, context, thread_info) {
        return caller;
    }
}
exports.IrisObjectBase = IrisObjectBase;
class IrisObjectBaseTag {
}
exports.IrisObjectBaseTag = IrisObjectBaseTag;
//# sourceMappingURL=IrisObjectBase.js.map