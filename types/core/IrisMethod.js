"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisContextEnvironment_1 = require("./IrisContextEnvironment");
const IrisDevUtil_1 = require("../util/IrisDevUtil");
var IrisMethodAuthority;
(function (IrisMethodAuthority) {
    IrisMethodAuthority[IrisMethodAuthority["Everyone"] = 0] = "Everyone";
    IrisMethodAuthority[IrisMethodAuthority["Relateive"] = 1] = "Relateive";
    IrisMethodAuthority[IrisMethodAuthority["Personal"] = 2] = "Personal";
})(IrisMethodAuthority = exports.IrisMethodAuthority || (exports.IrisMethodAuthority = {}));
var IrisCallSide;
(function (IrisCallSide) {
    IrisCallSide[IrisCallSide["InSide"] = 0] = "InSide";
    IrisCallSide[IrisCallSide["OutSide"] = 1] = "OutSide";
})(IrisCallSide = exports.IrisCallSide || (exports.IrisCallSide = {}));
class IrisNativeMethodDescriptor {
    //;
    constructor(method_name, parameter_count, is_with_varaible_parameter, authority, native_method_handle) {
        this.method_name = "";
        this.parameter_count = 0;
        this.is_with_varaible_parameter = false;
        this.authority = IrisMethodAuthority.Everyone;
        this.native_method_handle = undefined;
        this.method_name = method_name;
        this.parameter_count = parameter_count;
        this.is_with_varaible_parameter = is_with_varaible_parameter;
        this.authority = authority;
        this.native_method_handle = native_method_handle;
    }
}
exports.IrisNativeMethodDescriptor = IrisNativeMethodDescriptor;
class IrisUserMethodDescriptor {
    constructor(method_name, parameter_name_list, variable_parameter_name, with_block, without_block) {
        this.method_name = "";
        this.parameter_name_list = [];
        this.variable_parameter_name = "";
        this.method_name = method_name;
        this.parameter_name_list = parameter_name_list;
        this.variable_parameter_name = variable_parameter_name;
        this.with_block = with_block;
        this.without_block = without_block;
    }
}
exports.IrisUserMethodDescriptor = IrisUserMethodDescriptor;
class IrisMethod {
    constructor(method_defination) {
        this.name = "";
        this.authority = IrisMethodAuthority.Everyone;
        this.parameter_amount = 0;
        this.is_with_variable_parameter = false;
        this.object = undefined;
        this.method_content = undefined;
        if (method_defination instanceof IrisNativeMethodDescriptor) {
            this.name = method_defination.method_name;
            this.authority = method_defination.authority;
            this.is_with_variable_parameter = method_defination.is_with_varaible_parameter;
            this.parameter_amount = method_defination.parameter_count;
            this.method_content = method_defination.native_method_handle;
            let method_class = IrisDevUtil_1.IrisDev.get_class("Method");
            if (method_class != undefined) {
                this.create_method_object(method_class);
            }
        }
        else if (method_defination instanceof IrisUserMethodDescriptor) {
            this.name = method_defination.method_name;
            this.is_with_variable_parameter = method_defination.variable_parameter_name == "";
            this.parameter_amount = method_defination.parameter_name_list.length;
            this.method_content = method_defination;
            this.create_method_object(IrisDevUtil_1.IrisDev.get_class("Method"));
        }
    }
    reset_method_object() {
        this.create_method_object(IrisDevUtil_1.IrisDev.get_class("Method"));
    }
    create_method_object(method_class) {
        let method_obj = method_class.create_new_instance(undefined, undefined, undefined);
        IrisDevUtil_1.IrisDev.get_native_object_ref(method_obj).method = this;
        this.object = method_obj.object;
    }
    parameter_check(parameter_list) {
        if (parameter_list.length != 0) {
            if (this.is_with_variable_parameter) {
                return parameter_list.length >= this.parameter_amount;
            }
            else {
                return parameter_list.length == this.parameter_amount;
            }
        }
        else {
            return this.parameter_amount == 0;
        }
    }
    create_new_context(caller, prameter_list, context, thread_info) {
        return new IrisContextEnvironment_1.IrisContextEnvironment();
    }
    call(caller, parameter_list, context, thread_info) {
        let result = IrisDevUtil_1.IrisDev.nil();
        if (!this.parameter_check(parameter_list)) {
            /* Error */
            return IrisDevUtil_1.IrisDev.nil();
        }
        let new_context = this.create_new_context(caller.object, parameter_list, context, thread_info);
        if (typeof this.method_content == "function") {
            let variable_values;
            let normal_values;
            if (parameter_list.length > this.parameter_amount) {
                variable_values = parameter_list.slice(this.parameter_amount, parameter_list.length);
            }
            else {
                variable_values = [];
            }
            if (this.parameter_amount > 0) {
                normal_values = parameter_list.slice(0, this.parameter_amount);
            }
            else {
                normal_values = [];
            }
            result = this.method_content(caller, normal_values, variable_values, new_context, thread_info);
        }
        else {
            ;
        }
        return result;
    }
    call_main(parameter_list, context, thread_info) {
        if (!this.parameter_check(parameter_list)) {
            /* Error */
            return IrisDevUtil_1.IrisDev.nil();
        }
        let new_context = this.create_new_context(undefined, parameter_list, context, thread_info);
        return IrisDevUtil_1.IrisDev.nil();
    }
}
exports.IrisMethod = IrisMethod;
//# sourceMappingURL=IrisMethod.js.map