/**
 * IrisInteger class
 * Created by DaraW on 2017-1-15
 */

import IrisFloat from "./iris_float";
import IrisMethod from "../core/iris_method";
import { IrisDev } from "../util/iris_dev";

import {
        integer_sym
    } from "../util/iris_symbol";

export const Operation = {
    Add: 0,
    Sub: 1,
    Mul: 2,
    Div: 3,
    Power: 4,
    Mod: 5,

    Shr: 6,
    Shl: 7,
    Sar: 8,
    Sal: 9,
    BitXor: 10,
    BitAnd: 11,
    BitOr: 12,

    Equal: 13,
    NotEqual: 14,
    BigThan: 15,
    BigThanOrEqual: 16,
    LessThan: 17,
    LessThanOrEqual: 18
}

export class IrisInteger {

    native_class_name_define() {
        return "Integer";
    }

    native_super_class_define() {
        return $dev_util.get_class("Object");
    }

    native_super_module_define() {
        return null;
    }

    native_alloc() {
        return new IrisInteger.IrisIntegerTag(0);
    }

    native_class_define(class_obj) {
        class_obj.add_instance_method(IrisInteger, "Add", "+", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "Sub", "-", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "Mul", "*", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "Div", "/", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "Mod", "%", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "Power", "**", 1, false, IrisMethod.MethodAuthority.Everyone);

        class_obj.AddInstanceMethod(IrisInteger.class, "Equal", "==", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "NotEqual", "!=", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "BigThan", ">", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "BigThanOrEqual", ">=", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "LessThan", "<", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "LessThanOrEqual", "<=", 1, false, IrisMethod.MethodAuthority.Everyone);

        class_obj.AddInstanceMethod(IrisInteger.class, "Shr", ">>", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "Sar", ">>>", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "Shl", "<<", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "Sal", "<<<", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "BitXor", "^", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "BitOr", "|", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "BitAnd", "&", 1, false, IrisMethod.MethodAuthority.Everyone);

        class_obj.AddInstanceMethod(IrisInteger.class, "BitNot", "~", 0, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "Minus", "__minus", 0, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "Plus", "__plus", 0, false, IrisMethod.MethodAuthority.Everyone);

        class_obj.AddInstanceMethod(IrisInteger.class, "ToString", "to_string", 0, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisInteger.class, "ToFloat", "to_float", 0, false, IrisMethod.MethodAuthority.Everyone);

    }

    static get IrisIntegerTag() {
        return IrisIntegerTag;
    }

    static cast_operation(type, left_value, right_value) {
        let result = null;
        let need_cast; // TODO
        if (need_cast) {
            if (type != Operation.Mod) {
                let cast_left_value = (new IrisInteger.IrisIntegerTag()).to_float.call(left_value);
                let org_right_value ; // TODO
                let result_value = null;
                switch(type) {
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
                result = $dev_util.create_float(0.0);
                result.object.native_object = result_value;
            } else {
                let cast_right_value = (new IrisFloat.IrisFloatTag()).to_integer.call(right_value);
                let org_left_value = $dev_util.get_native_objec_ref(left_value);
                let result_value = org_left_value.mod(cast_right_value);
                result = $dev_util.create_int(0);
                result.object.native_object = result_value;
            }
        } else {
            let org_left_value = $dev_util.get_native_objec_ref(left_value);
			let org_right_value = $dev_util.get_native_objec_ref(right_value);
			let result_value = null;
			switch(type) {
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

			result = $dev_util.create_int(0);
            result.object.native_object = result_value;
        }

        return result;
    }

    static cmp_operation(type, left_value, right_value) {
        let cmp_result = false;
        let need_cast; // TODO
        if (need_cast) {
            let cast_left_value = (new IrisInteger.IrisIntegerTag()).to_float.call(left_value);
            let org_right_value = $dev_util.get_native_objec_ref(right_value);
            switch(type) {
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
        } else {
            let org_left_value = $dev_util.get_native_objec_ref(left_value);
			let org_right_value = $dev_util.get_native_objec_ref(right_value);
			switch(type) {
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

        return cmp_result ? $dev_util.true : $dev_util.false;
    }

    static bit_operation(type, left_value, right_value) {
        if (!$dev_util.check_class(right_value, "Integer")) {
            return $dev_util.nil;
        }

        let org_left_value = $dev_util.get_native_objec_ref(left_value);
        let org_right_value = $dev_util.get_native_objec_ref(right_value);
        let result_value = null;
        switch(type) {
            case Operation.Sal:
                result_value = cast_left_value.sal(org_right_value);
                break;
            case Operation.Sar:
                result_value = cast_left_value.sar(org_right_value);
                break;
            case Operation.Shl:
                result_value = cast_left_value.shl(org_right_value);
                break;
            case Operation.Shr:
                result_value = cast_left_value.shr(org_right_value);
                break;
            case Operation.BitAnd:
                result_value = cast_left_value.bit_and(org_right_value);
                break;
            case Operation.BitOr:
                result_value = cast_left_value.bit_or(org_right_value);
                break;
            case Operation.BitXor:
                result_value = cast_left_value.bit_xor(org_right_value);
                break;
            default:
                break;
        }

        result = $dev_util.create_int(0);
        result.object.native_object = result_value;
        return result;
    }

    static add(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.cast_operation(Operation.Add, self, parameter_list[0]);
    }

    static sub(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.cast_operation(Operation.Sub, self, parameter_list[0]);
    }

    static mul(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.cast_operation(Operation.Mul, self, parameter_list[0]);
    }

    static div(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.cast_operation(Operation.Div, self, parameter_list[0]);
    }

    static mod(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.cast_operation(Operation.Mod, self, parameter_list[0]);
    }

    static power(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.cast_operation(Operation.Power, self, parameter_list[0]);
    }

    static equal(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.cmp_operation(Operation.Equal, self, parameter_list[0]);
    }

    static not_equal(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.cmp_operation(Operation.NotEqual, self, parameter_list[0]);
    }

    static big_than(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.cmp_operation(Operation.BigThan, self, parameter_list[0]);
    }

    static big_than_or_equal(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.cmp_operation(Operation.BigThanOrEqual, self, parameter_list[0]);
    }

    static less_than(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.cmp_operation(Operation.LessThan, self, parameter_list[0]);
    }

    static less_than_or_equal(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.cmp_operation(Operation.LessThanOrEqual, self, parameter_list[0]);
    }

    static shr(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.bit_operation(Operation.Shr, self, parameter_list[0]);
    }

    static sar(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.bit_operation(Operation.Sar, self, parameter_list[0]);
    }

    static shl(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.bit_operation(Operation.Shl, self, parameter_list[0]);
    }

    static sal(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.bit_operation(Operation.Sal, self, parameter_list[0]);
    }

    static bit_xor(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.bit_operation(Operation.BitXor, self, parameter_list[0]);
    }

    static bit_or(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.bit_operation(Operation.BitOr, self, parameter_list[0]);
    }

    static bit_and(self, parameter_list, variable_parameter_list, context, thread_info) {
        return this.bit_operation(Operation.BitAnd, self, parameter_list[0]);
    }

    static bit_not(self, parameter_list, variable_parameter_list, context, thread_info) {
        let self_value = $dev_util.get_native_objec_ref(self);
        let result = $dev_util.create_int(0);
        result.object.native_object = self_value.bit_not();
        return result;
    }

    static plus(self, parameter_list, variable_parameter_list, context, thread_info) {
        let self_value = $dev_util.get_native_objec_ref(self);
        let result = $dev_util.create_int(0);
        result.object.native_object = self_value.plus();
        return result;
    }

    static minus(self, parameter_list, variable_parameter_list, context, thread_info) {
        let self_value = $dev_util.get_native_objec_ref(self);
        let result = $dev_util.create_int(0);
        result.object.native_object = self_value.minus();
        return result;
    }

    static to_float(self, parameter_list, variable_parameter_list, context, thread_info) {
        let result = $dev_util.create_float($dev_util.get_int(self));
        return result;
    }

    static to_string(self, parameter_list, variable_parameter_list, context, thread_info) {
        let result = $dev_util.create_string($dev_util.get_native_objec_ref(self).to_string());
        return result;
    }
}

class IrisIntegerTag {
    constructor(integer) {
        this[integer_sym] = integer;
    }

    to_float() {
        return new IrisFloat.IrisFloatTag(this[integer_sym]);
    }

    to_string() {
        return this[integer_sym].toString();
    }

    add(target) {
        return new IrisIntegerTag(this[integer_sym] + target.integer);
    }

    sub(target) {
        return new IrisIntegerTag(this[integer_sym] - target.integer);
    }

    mul(target) {
        return new IrisIntegerTag(this[integer_sym] * target.integer);
    }

    div(target) {
        return new IrisIntegerTag(this[integer_sym] / target.integer);
    }

    mod(target) {
        return new IrisIntegerTag(this[integer_sym] % target.integer);
    }

    power(target) {
        return new IrisIntegerTag(Math.pow(this[integer_sym], target.integer));
    }

    shl(target) {
        return new IrisIntegerTag(this[integer_sym] >> target.integer);
    }

    sal(target) {
        return new IrisIntegerTag(this[integer_sym] >>> target.integer);
    }

    shr(target) {
        return new IrisIntegerTag(this[integer_sym] << target.integer);
    }

    sar(target) {
        return new IrisIntegerTag(this[integer_sym] << target.integer);
    }

    bit_xor(target) {
        return new IrisIntegerTag(this[integer_sym] ^ target.integer);
    }

    bit_or(target) {
        return new IrisIntegerTag(this[integer_sym] | target.integer);
    }

    bit_and(target) {
        return new IrisIntegerTag(this[integer_sym] & target.integer);
    }

    bit_not() {
        return new IrisIntegerTag(~this[integer_sym]);
    }

    equal(target) {
        return this[integer_sym] === target.integer;
    }

    not_equal(target) {
        return !this.equal(target);
    }

    big_than(target) {
        return this[integer_sym] > target.integer;
    }

    big_than_or_equal(target) {
        return this[integer_sym] >= target.integer;
    }

    less_than(target) {
        return this[integer_sym] < target.integer;
    }

    less_than_or_equal(target) {
        return this[integer_sym] <= target.integer;
    }

    plus() {
        return new IrisIntegerTag(this[integer_sym]);
    }

    minus() {
        return new IrisIntegerTag(-this[integer_sym]);
    }

    get integer() {
        return this[integer_sym];
    }

    set integer(integer) {
        this[integer_sym] = integer;
    }

}
