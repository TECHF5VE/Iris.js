"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisDevUtil_1 = require("../util/IrisDevUtil");
const IrisInteger_1 = require("./IrisInteger");
const IrisMethod_1 = require("../core/IrisMethod");
var Operation;
(function (Operation) {
    Operation[Operation["Add"] = 0] = "Add";
    Operation[Operation["Sub"] = 1] = "Sub";
    Operation[Operation["Mul"] = 2] = "Mul";
    Operation[Operation["Div"] = 3] = "Div";
    Operation[Operation["Power"] = 4] = "Power";
    Operation[Operation["Equal"] = 5] = "Equal";
    Operation[Operation["NotEqual"] = 6] = "NotEqual";
    Operation[Operation["BigThan"] = 7] = "BigThan";
    Operation[Operation["BigThanOrEqual"] = 8] = "BigThanOrEqual";
    Operation[Operation["LessThan"] = 9] = "LessThan";
    Operation[Operation["LessThanOrEqual"] = 10] = "LessThanOrEqual";
})(Operation || (Operation = {}));
;
class IrisFloatClass {
    native_class_name_define() {
        return "Float";
    }
    native_super_class_define() {
        return IrisDevUtil_1.IrisDev.get_class("Object");
    }
    native_upper_module_define() {
        return undefined;
    }
    native_alloc() {
        return new IrisFloatClassTag(0.0);
    }
    native_class_define() {
        return [
            { method_name: "+", native_method: IrisFloatClass.add, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "-", native_method: IrisFloatClass.sub, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "*", native_method: IrisFloatClass.mul, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "/", native_method: IrisFloatClass.div, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "**", native_method: IrisFloatClass.power, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "==", native_method: IrisFloatClass.equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "!=", native_method: IrisFloatClass.not_equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: ">", native_method: IrisFloatClass.big_than, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: ">=", native_method: IrisFloatClass.big_than_or_equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "<", native_method: IrisFloatClass.less_than, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "<=", native_method: IrisFloatClass.less_than_or_equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
        ];
    }
    static cast_operation(type, left_value, right_value) {
        let result;
        let need_cast = IrisDevUtil_1.IrisDev.check_is_integer(right_value);
        if (!need_cast && !IrisDevUtil_1.IrisDev.check_is_float(right_value)) {
            // Error
            return IrisDevUtil_1.IrisDev.nil();
        }
        let org_left_value = IrisDevUtil_1.IrisDev.get_native_object_ref(left_value);
        let result_value = undefined;
        let finally_right_value;
        if (need_cast) {
            finally_right_value = IrisDevUtil_1.IrisDev.get_native_object_ref(right_value).to_float();
        }
        else {
            finally_right_value = IrisDevUtil_1.IrisDev.get_native_object_ref(right_value);
        }
        switch (type) {
            case Operation.Add:
                result_value = org_left_value.add(finally_right_value);
                break;
            case Operation.Sub:
                result_value = org_left_value.sub(finally_right_value);
                break;
            case Operation.Mul:
                result_value = org_left_value.mul(finally_right_value);
                break;
            case Operation.Div:
                result_value = org_left_value.div(finally_right_value);
                break;
            case Operation.Power:
                result_value = org_left_value.power(finally_right_value);
                break;
            default:
                break;
        }
        result = IrisDevUtil_1.IrisDev.create_float(0.0);
        result.object.native_object = result_value;
        return result;
    }
    static cmp_operation(type, left_value, right_value) {
        let cmp_result = false;
        let need_cast = IrisDevUtil_1.IrisDev.check_is_integer(right_value);
        if (!need_cast && !IrisDevUtil_1.IrisDev.check_is_float(right_value)) {
            // Error
            return IrisDevUtil_1.IrisDev.nil();
        }
        let org_left_value = IrisDevUtil_1.IrisDev.get_native_object_ref(left_value);
        let finally_right_value;
        if (need_cast) {
            finally_right_value = IrisDevUtil_1.IrisDev.get_native_object_ref(right_value).to_float();
        }
        else {
            finally_right_value = IrisDevUtil_1.IrisDev.get_native_object_ref(right_value);
        }
        switch (type) {
            case Operation.Equal:
                cmp_result = org_left_value.equal(finally_right_value);
                break;
            case Operation.NotEqual:
                cmp_result = org_left_value.not_equal(finally_right_value);
                break;
            case Operation.BigThan:
                cmp_result = org_left_value.big_than_or_equal(finally_right_value);
                break;
            case Operation.BigThanOrEqual:
                cmp_result = org_left_value.big_than_or_equal(finally_right_value);
                break;
            case Operation.LessThan:
                cmp_result = org_left_value.less_than(finally_right_value);
                break;
            case Operation.LessThanOrEqual:
                cmp_result = org_left_value.less_than_or_equal(finally_right_value);
                break;
            default:
                break;
        }
        return cmp_result ? IrisDevUtil_1.IrisDev.true() : IrisDevUtil_1.IrisDev.false();
    }
    static add(caller, parameters, variableParameters, context, thread_info) {
        return IrisFloatClass.cast_operation(Operation.Add, caller, parameters[0]);
    }
    static sub(caller, parameters, variableParameters, context, thread_info) {
        return IrisFloatClass.cast_operation(Operation.Sub, caller, parameters[0]);
    }
    static mul(caller, parameters, variableParameters, context, thread_info) {
        return IrisFloatClass.cast_operation(Operation.Mul, caller, parameters[0]);
    }
    static div(caller, parameters, variableParameters, context, thread_info) {
        return IrisFloatClass.cast_operation(Operation.Div, caller, parameters[0]);
    }
    static power(caller, parameters, variableParameters, context, thread_info) {
        return IrisFloatClass.cast_operation(Operation.Power, caller, parameters[0]);
    }
    static equal(caller, parameters, variableParameters, context, thread_info) {
        return IrisFloatClass.cmp_operation(Operation.Equal, caller, parameters[0]);
    }
    static not_equal(caller, parameters, variableParameters, context, thread_info) {
        return IrisFloatClass.cmp_operation(Operation.NotEqual, caller, parameters[0]);
    }
    static big_than(caller, parameters, variableParameters, context, thread_info) {
        return this.cmp_operation(Operation.BigThan, caller, parameters[0]);
    }
    static big_than_or_equal(caller, parameters, variableParameters, context, thread_info) {
        return IrisFloatClass.cmp_operation(Operation.BigThanOrEqual, caller, parameters[0]);
    }
    static less_than(caller, parameters, variableParameters, context, thread_info) {
        return IrisFloatClass.cmp_operation(Operation.LessThan, caller, parameters[0]);
    }
    static less_than_or_equal(caller, parameters, variableParameters, context, thread_info) {
        return IrisFloatClass.cmp_operation(Operation.LessThanOrEqual, caller, parameters[0]);
    }
}
exports.IrisFloatClass = IrisFloatClass;
class IrisFloatClassTag {
    constructor(float) {
        this.float = float;
    }
    to_integer() {
        return new IrisInteger_1.IrisIntegerClassTag(this.float);
    }
    to_string() {
        return this.float.toString();
    }
    add(value) {
        return new IrisFloatClassTag(this.float + value.float);
    }
    sub(value) {
        return new IrisFloatClassTag(this.float - value.float);
    }
    mul(value) {
        return new IrisFloatClassTag(this.float * value.float);
    }
    div(value) {
        return new IrisFloatClassTag(this.float / value.float);
    }
    power(value) {
        return new IrisFloatClassTag(Math.pow(this.float, value.float));
    }
    equal(value) {
        return this.float == value.float;
    }
    not_equal(value) {
        return !this.equal(value);
    }
    big_than(value) {
        return this.float > value.float;
    }
    big_than_or_equal(value) {
        return this.float >= value.float;
    }
    less_than(value) {
        return this.float < value.float;
    }
    less_than_or_equal(value) {
        return this.float <= value.float;
    }
}
exports.IrisFloatClassTag = IrisFloatClassTag;
//# sourceMappingURL=IrisFloat.js.map