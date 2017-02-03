/**
 * IrisFloat class
 * Created by DaraW on 2017-1-15
 */

import { Irisfloat } from "../core";
import { IrisDev } from '../util';
import {
    float_sym
    } from "../util/iris_symbol";

export const Operation = {
    Add: 0,
    Sub: 1,
    Mul: 2,
    Div: 3,
    Power: 4,
    Mod: 5,

    Equal: 13,
    NotEqual: 14,
    BigThan: 15,
    BigThanOrEqual: 16,
    LessThan: 17,
    LessThanOrEqual: 18
}

export class IrisFloat {

    native_class_name_define() {
        return "Float";
    }

    native_super_class_define() {
        return IrisDev.get_class("Object");
    }

    native_super_module_define() {
        return null;
    }

    native_alloc() {
        return new IrisInteger.IrisIntegerTag(0.0);
    }

    native_class_define(class_obj) {
        class_obj.add_instance_method(IrisFloat, "Add", "+", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisFloat.class, "Sub", "-", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisFloat.class, "Mul", "*", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisFloat.class, "Div", "/", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisFloat.class, "Power", "**", 1, false, IrisMethod.MethodAuthority.Everyone);

        class_obj.AddInstanceMethod(IrisFloat.class, "Equal", "==", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisFloat.class, "NotEqual", "!=", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisFloat.class, "BigThan", ">", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisFloat.class, "BigThanOrEqual", ">=", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisFloat.class, "LessThan", "<", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisFloat.class, "LessThanOrEqual", "<=", 1, false, IrisMethod.MethodAuthority.Everyone);

        class_obj.AddInstanceMethod(IrisFloat.class, "Minus", "__minus", 0, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisFloat.class, "Plus", "__plus", 0, false, IrisMethod.MethodAuthority.Everyone);

        class_obj.AddInstanceMethod(IrisFloat.class, "ToString", "to_string", 0, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.AddInstanceMethod(IrisFloat.class, "ToInteger", "to_integer", 0, false, IrisMethod.MethodAuthority.Everyone);

    }

    static cast_operation(type, left_value, right_value) {
        let result = null;
        let need_cast = IrisDev.check_class(right_value, "Integer");
        if(!need_cast && !IrisDev.check_class(right_value, "Float")) {
			return IrisDev.nil;
		}
        let org_left_value = IrisDev.get_native_objec_ref(left_value);
        let result_value = null;
        let finally_right_value = null;

        if (need_cast) {
            finally_right_value = (new IrisInteger.IrisIntegerTag()).to_float.call(left_value);
        } else {
            finally_right_value = IrisDev.get_native_objec_ref(left_value);
        }

        switch(type) {
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

        result = IrisDev.create_float(0.0);
        result.object.native_object = result_value;
        return result;
    }

    static cmp_operation(type, left_value, right_value) {
        let result = null;
        let need_cast = IrisDev.check_class(right_value, "Integer");
        if(!need_cast && !IrisDev.check_class(right_value, "Float")) {
            return IrisDev.nil;
        }
        let org_left_value = IrisDev.get_native_objec_ref(left_value);
        let finally_right_value = null;

        if (need_cast) {
            finally_right_value = (new IrisInteger.IrisIntegerTag()).to_float.call(left_value);
        } else {
            finally_right_value = IrisDev.get_native_objec_ref(left_value);
        }

        switch(type) {
            case Operation.Equal:
                result = org_left_value.equal(finally_right_value);
                break;
            case Operation.NotEqual:
                result = org_left_value.not_equal(finally_right_value);
                break;
            case Operation.BigThan:
                result = org_left_value.big_than(finally_right_value);
                break;
            case Operation.BigThanOrEqual:
                result = org_left_value.big_than_or_equal(finally_right_value);
                break;
            case Operation.LessThan:
                result = org_left_value.less_than(finally_right_value);
                break;
            case Operation.LessThanOrEqual:
                result = org_left_value.less_than_or_equal(finally_right_value);
                break;
            default:
                break;
        }

        return result ? IrisDev.true : IrisDev.false;
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

    static plus(self, parameter_list, variable_parameter_list, context, thread_info) {
        let self_value = IrisDev.get_native_objec_ref(self);
        let result = IrisDev.create_float(0.0);
        result.object.native_object = self_value.plus();
        return result;
    }

    static minus(self, parameter_list, variable_parameter_list, context, thread_info) {
        let self_value = IrisDev.get_native_objec_ref(self);
        let result = IrisDev.create_float(0.0);
        result.object.native_object = self_value.minus();
        return result;
    }

    static to_integer(self, parameter_list, variable_parameter_list, context, thread_info) {
        let result = IrisDev.create_float(IrisDev.get_float(self));
        return result;
    }

    static to_string(self, parameter_list, variable_parameter_list, context, thread_info) {
        let result = IrisDev.create_string(IrisDev.get_native_objec_ref(self).to_string());
        return result;
    }

    static get IrisFloatTag() {
        return IrisFloatTag;
    }
}

class IrisFloatTag {
    constructor(float) {
        this[float_sym] = float;
    }

    to_integer() {
        return new IrisInteger.IrisIntegerTag(this[float_sym]);
    }

    to_string() {
        return this[float_sym].toString();
    }

    iris_float_tag(d_float) {
        this.float = d_float;
    }

    add(target) {
        return new IrisFloatTag(this[float_sym] + target.float);
    }

    sub(target) {
        return new IrisFloatTag(this[float_sym] - target.float);
    }

    mul(target) {
        return new IrisFloatTag(this[float_sym] * target.float);
    }

    div(target) {
        return new IrisFloatTag(this[float_sym] / target.float);
    }

    mod(target) {
        return new IrisFloatTag(this[float_sym] % target.float);
    }

    power(target) {
        return Math.pow(this[float_sym], target.float);
    }

    equal(target) {
        return this[float_sym] === target.float;
    }

    not_equal(target) {
        return !this.equal(target);
    }

    big_than(target) {
        return this[float_sym] > target.float;
    }

    big_than_or_equal(target) {
        return this[float_sym] >= target.float;
    }

    less_than(target) {
        return this[float_sym] < target.float;
    }

    less_than_or_equal(target) {
        return this[float_sym] <= target.float;
    }

    plus() {
        return new IrisFloatTag(this[float_sym]);
    }

    minus() {
        return new IrisFloatTag(-this[float_sym]);
    }

    get float() {
        return this[float_sym];
    }

    set float(float) {
        this[float_sym] = float;
    }
}
