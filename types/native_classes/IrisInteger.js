"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisDevUtil_1 = require("../util/IrisDevUtil");
const IrisFloat_1 = require("./IrisFloat");
const IrisMethod_1 = require("../core/IrisMethod");
var Operation;
(function (Operation) {
    Operation[Operation["Add"] = 0] = "Add";
    Operation[Operation["Sub"] = 1] = "Sub";
    Operation[Operation["Mul"] = 2] = "Mul";
    Operation[Operation["Div"] = 3] = "Div";
    Operation[Operation["Power"] = 4] = "Power";
    Operation[Operation["Mod"] = 5] = "Mod";
    Operation[Operation["Shr"] = 6] = "Shr";
    Operation[Operation["Shl"] = 7] = "Shl";
    Operation[Operation["Sar"] = 8] = "Sar";
    Operation[Operation["Sal"] = 9] = "Sal";
    Operation[Operation["BitXor"] = 10] = "BitXor";
    Operation[Operation["BitAnd"] = 11] = "BitAnd";
    Operation[Operation["BitOr"] = 12] = "BitOr";
    Operation[Operation["Equal"] = 13] = "Equal";
    Operation[Operation["NotEqual"] = 14] = "NotEqual";
    Operation[Operation["BigThan"] = 15] = "BigThan";
    Operation[Operation["BigThanOrEqual"] = 16] = "BigThanOrEqual";
    Operation[Operation["LessThan"] = 17] = "LessThan";
    Operation[Operation["LessThanOrEqual"] = 18] = "LessThanOrEqual";
})(Operation || (Operation = {}));
;
class IrisIntegerClass {
    native_class_name_define() {
        return "Integer";
    }
    native_super_class_define() {
        return IrisDevUtil_1.IrisDev.get_class("Object");
    }
    native_upper_module_define() {
        return undefined;
    }
    native_alloc() {
        return new IrisIntegerClassTag(0);
    }
    native_class_define() {
        return [
            { method_name: "+", native_method: IrisIntegerClass.add, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "-", native_method: IrisIntegerClass.sub, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "*", native_method: IrisIntegerClass.mul, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "/", native_method: IrisIntegerClass.div, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "%", native_method: IrisIntegerClass.mod, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "**", native_method: IrisIntegerClass.power, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "==", native_method: IrisIntegerClass.equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "!=", native_method: IrisIntegerClass.not_equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: ">", native_method: IrisIntegerClass.big_than, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: ">=", native_method: IrisIntegerClass.big_than_or_equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "<", native_method: IrisIntegerClass.less_than, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "<=", native_method: IrisIntegerClass.less_than_or_equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: ">>", native_method: IrisIntegerClass.shr, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: ">>>", native_method: IrisIntegerClass.sar, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "<<", native_method: IrisIntegerClass.shl, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "<<<", native_method: IrisIntegerClass.sal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "^", native_method: IrisIntegerClass.bit_xor, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "&", native_method: IrisIntegerClass.bit_and, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
            { method_name: "|", native_method: IrisIntegerClass.bit_or, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethod_1.IrisMethodAuthority.Everyone },
        ];
    }
    static cast_operation(type, left_value, right_value) {
        let result;
        let need_cast = IrisDevUtil_1.IrisDev.check_is_float(right_value);
        if (need_cast) {
            if (type != Operation.Mod) {
                let cast_left_value = IrisDevUtil_1.IrisDev.get_native_object_ref(left_value).to_float();
                let org_right_value = IrisDevUtil_1.IrisDev.get_native_object_ref(right_value);
                let result_value = undefined;
                switch (type) {
                    case Operation.Add:
                        result_value = cast_left_value.add(org_right_value);
                        break;
                    case Operation.Sub:
                        result_value = cast_left_value.sub(org_right_value);
                        break;
                    case Operation.Mul:
                        result_value = cast_left_value.mul(org_right_value);
                        break;
                    case Operation.Div:
                        result_value = cast_left_value.div(org_right_value);
                        break;
                    case Operation.Power:
                        result_value = cast_left_value.power(org_right_value);
                        break;
                    default:
                        break;
                }
                result = IrisDevUtil_1.IrisDev.create_float(0.0);
                result.object.native_object = org_right_value;
            }
            else {
                let cast_right_value = IrisDevUtil_1.IrisDev.get_native_object_ref(right_value).to_integer();
                let org_left_value = IrisDevUtil_1.IrisDev.get_native_object_ref(left_value);
                let result_value = org_left_value.mod(cast_right_value);
                result = IrisDevUtil_1.IrisDev.create_int(0);
                result.object.native_object = result_value;
            }
        }
        else {
            let org_left_value = IrisDevUtil_1.IrisDev.get_native_object_ref(left_value);
            let org_right_value = IrisDevUtil_1.IrisDev.get_native_object_ref(right_value);
            let result_value = undefined;
            switch (type) {
                case Operation.Add:
                    result_value = org_left_value.add(org_right_value);
                    break;
                case Operation.Sub:
                    result_value = org_left_value.sub(org_right_value);
                    break;
                case Operation.Mul:
                    result_value = org_left_value.mul(org_right_value);
                    break;
                case Operation.Div:
                    result_value = org_left_value.div(org_right_value);
                    break;
                case Operation.Power:
                    result_value = org_left_value.power(org_right_value);
                    break;
                default:
                    break;
            }
            result = IrisDevUtil_1.IrisDev.create_int(0);
            result.object.native_object = result_value;
        }
        return result;
    }
    static cmp_operation(type, left_value, right_value) {
        let need_cast = IrisDevUtil_1.IrisDev.check_is_float(right_value);
        let cmp_result = false;
        if (need_cast) {
            let cast_left_value = IrisDevUtil_1.IrisDev.get_native_object_ref(left_value).to_float();
            let org_right_value = IrisDevUtil_1.IrisDev.get_native_object_ref(right_value);
            switch (type) {
                case Operation.Equal:
                    cmp_result = cast_left_value.equal(org_right_value);
                    break;
                case Operation.NotEqual:
                    cmp_result = cast_left_value.not_equal(org_right_value);
                    break;
                case Operation.BigThan:
                    cmp_result = cast_left_value.big_than(org_right_value);
                    break;
                case Operation.BigThanOrEqual:
                    cmp_result = cast_left_value.big_than_or_equal(org_right_value);
                    break;
                case Operation.LessThan:
                    cmp_result = cast_left_value.less_than(org_right_value);
                    break;
                case Operation.LessThanOrEqual:
                    cmp_result = cast_left_value.less_than_or_equal(org_right_value);
                    break;
                default:
                    break;
            }
        }
        else {
            let org_left_value = IrisDevUtil_1.IrisDev.get_native_object_ref(left_value);
            let org_right_value = IrisDevUtil_1.IrisDev.get_native_object_ref(right_value);
            switch (type) {
                case Operation.Equal:
                    cmp_result = org_right_value.equal(org_right_value);
                    break;
                case Operation.NotEqual:
                    cmp_result = org_right_value.not_equal(org_right_value);
                    break;
                case Operation.BigThan:
                    cmp_result = org_right_value.big_than(org_right_value);
                    break;
                case Operation.BigThanOrEqual:
                    cmp_result = org_right_value.big_than_or_equal(org_right_value);
                    break;
                case Operation.LessThan:
                    cmp_result = org_right_value.less_than(org_right_value);
                    break;
                case Operation.LessThanOrEqual:
                    cmp_result = org_right_value.less_than_or_equal(org_right_value);
                    break;
                default:
                    break;
            }
        }
        return cmp_result ? IrisDevUtil_1.IrisDev.true() : IrisDevUtil_1.IrisDev.false();
    }
    bit_operation(type, left_value, right_value) {
        if (!IrisDevUtil_1.IrisDev.check_is_integer(right_value)) {
            // Error
            return IrisDevUtil_1.IrisDev.nil();
        }
        let org_left_value = IrisDevUtil_1.IrisDev.get_native_object_ref(left_value);
        let org_right_value = IrisDevUtil_1.IrisDev.get_native_object_ref(left_value);
        let result_value = undefined;
        switch (type) {
            case Operation.Sal:
                result_value = org_left_value.sal(org_right_value);
                break;
            case Operation.Sar:
                result_value = org_left_value.sar(org_right_value);
                break;
            case Operation.Shl:
                result_value = org_left_value.shl(org_right_value);
                break;
            case Operation.Shr:
                result_value = org_left_value.shr(org_right_value);
                break;
            case Operation.BitAnd:
                result_value = org_left_value.bit_and(org_right_value);
                break;
            case Operation.BitOr:
                result_value = org_left_value.bit_or(org_right_value);
                break;
            case Operation.BitXor:
                result_value = org_left_value.bit_xor(org_right_value);
                break;
            default:
                break;
        }
        let result = IrisDevUtil_1.IrisDev.create_int(0);
        result.object.native_object = result_value;
        return result;
    }
    static add(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cast_operation(Operation.Add, caller, parameters[0]);
    }
    static sub(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cast_operation(Operation.Sub, caller, parameters[0]);
    }
    static mul(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cast_operation(Operation.Mul, caller, parameters[0]);
    }
    static div(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cast_operation(Operation.Div, caller, parameters[0]);
    }
    static mod(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cast_operation(Operation.Mod, caller, parameters[0]);
    }
    static power(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cast_operation(Operation.Power, caller, parameters[0]);
    }
    static equal(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cmp_operation(Operation.Equal, caller, parameters[0]);
    }
    static not_equal(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cmp_operation(Operation.NotEqual, caller, parameters[0]);
    }
    static big_than(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cmp_operation(Operation.BigThan, caller, parameters[0]);
    }
    static big_than_or_equal(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cmp_operation(Operation.BigThanOrEqual, caller, parameters[0]);
    }
    static less_than(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cmp_operation(Operation.LessThan, caller, parameters[0]);
    }
    static less_than_or_equal(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cmp_operation(Operation.LessThanOrEqual, caller, parameters[0]);
    }
    static shr(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cmp_operation(Operation.Shr, caller, parameters[0]);
    }
    static sar(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cmp_operation(Operation.Sar, caller, parameters[0]);
    }
    static shl(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cmp_operation(Operation.Shl, caller, parameters[0]);
    }
    static sal(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cmp_operation(Operation.Sal, caller, parameters[0]);
    }
    static bit_xor(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cmp_operation(Operation.BitXor, caller, parameters[0]);
    }
    static bit_or(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cmp_operation(Operation.BitOr, caller, parameters[0]);
    }
    static bit_and(caller, parameters, variable_parameters, context, thread_info) {
        return IrisIntegerClass.cmp_operation(Operation.BitAnd, caller, parameters[0]);
    }
}
exports.IrisIntegerClass = IrisIntegerClass;
class IrisIntegerClassTag {
    constructor(integer) {
        this.integer = 0;
        this.integer = Math.round(integer);
    }
    to_float() {
        return new IrisFloat_1.IrisFloatClassTag(this.integer * 1.0);
    }
    to_string() {
        return this.integer.toString();
    }
    add(value) {
        return new IrisIntegerClassTag(this.integer + value.integer);
    }
    sub(value) {
        return new IrisIntegerClassTag(this.integer - value.integer);
    }
    mul(value) {
        return new IrisIntegerClassTag(this.integer * value.integer);
    }
    div(value) {
        return new IrisIntegerClassTag(this.integer / value.integer);
    }
    power(value) {
        return new IrisIntegerClassTag(Math.pow(this.integer, value.integer));
    }
    mod(value) {
        return new IrisIntegerClassTag(this.integer % value.integer);
    }
    shr(value) {
        return new IrisIntegerClassTag(this.integer >> value.integer);
    }
    shl(value) {
        return new IrisIntegerClassTag(this.integer << value.integer);
    }
    sar(value) {
        return new IrisIntegerClassTag(this.integer >>> value.integer);
    }
    sal(value) {
        return new IrisIntegerClassTag(this.integer << value.integer);
    }
    bit_xor(value) {
        return new IrisIntegerClassTag(this.integer ^ value.integer);
    }
    bit_and(value) {
        return new IrisIntegerClassTag(this.integer & value.integer);
    }
    bit_or(value) {
        return new IrisIntegerClassTag(this.integer | value.integer);
    }
    equal(value) {
        return this.integer == value.integer;
    }
    not_equal(value) {
        return !this.equal(value);
    }
    big_than(value) {
        return this.integer > value.integer;
    }
    big_than_or_equal(value) {
        return this.integer >= value.integer;
    }
    less_than(value) {
        return this.integer < value.integer;
    }
    less_than_or_equal(value) {
        return this.integer <= value.integer;
    }
}
exports.IrisIntegerClassTag = IrisIntegerClassTag;
//# sourceMappingURL=IrisInteger.js.map