import { IrisNativeClassBase, IrisMethodDefineDescriptor } from "../interface/IrisNativeClassBase"
import { IrisClass } from "../core/IrisClass"
import { IrisModule } from "../core/IrisModule"
import { IrisDev } from "../util/IrisDevUtil"
import { IrisValue} from "../core/IrisValue"
import { IrisContextEnvironment} from "../core/IrisContextEnvironment"
import { IrisThreadInfo } from "../core/IrisThreadInfo"
import { IrisIntegerClassTag } from "./IrisInteger"
import { IrisObject } from "../core/IrisObject"
import { IrisMethodAuthority } from "../core/IrisMethod"

enum Operation {
    Add,
    Sub,
    Mul,
    Div,
    Power,

    Equal,
    NotEqual,
    BigThan,
    BigThanOrEqual,
    LessThan,
    LessThanOrEqual,
};

export class IrisFloatClass implements IrisNativeClassBase {
    public native_class_name_define(): string {
        return "Float";
    }

    public native_super_class_define(): IrisClass | undefined {
        return IrisDev.get_class("Object") as IrisClass;
    }

    public native_upper_module_define(): IrisModule | undefined {
        return undefined;
    }

    public native_alloc(): Object {
        return new IrisFloatClassTag(0.0);
    }

    public native_class_define(): IrisMethodDefineDescriptor[] {
        return [
            { method_name: "+", native_method: IrisFloatClass.add, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "-", native_method: IrisFloatClass.sub, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "*", native_method: IrisFloatClass.mul, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "/", native_method: IrisFloatClass.div, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "**", native_method: IrisFloatClass.power, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },

            { method_name: "==", native_method: IrisFloatClass.equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "!=", native_method: IrisFloatClass.not_equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: ">", native_method: IrisFloatClass.big_than, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: ">=", native_method: IrisFloatClass.big_than_or_equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "<", native_method: IrisFloatClass.less_than, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "<=", native_method: IrisFloatClass.less_than_or_equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
        ];
    }

    private static cast_operation(type: Operation, left_value: IrisValue, right_value: IrisValue): IrisValue {
        let result: IrisValue;
        let need_cast = IrisDev.check_is_integer(right_value);
        
        if(!need_cast && !IrisDev.check_is_float(right_value)) {
            // Error
            return IrisDev.nil();
        }

        let org_left_value: IrisFloatClassTag = IrisDev.get_native_object_ref<IrisFloatClassTag>(left_value);
        let result_value: IrisFloatClassTag | undefined = undefined;
        let finally_right_value: IrisFloatClassTag;

        if(need_cast) {
            finally_right_value = IrisDev.get_native_object_ref<IrisIntegerClassTag>(right_value).to_float();
        }
        else {
            finally_right_value = IrisDev.get_native_object_ref<IrisFloatClassTag>(right_value);
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
        (result.object as IrisObject).native_object = result_value;
        return result;
    }

    private static cmp_operation(type: Operation, left_value: IrisValue, right_value: IrisValue): IrisValue {
        let cmp_result: boolean = false;
        let need_cast = IrisDev.check_is_integer(right_value);
        
        if(!need_cast && !IrisDev.check_is_float(right_value)) {
            // Error
            return IrisDev.nil();
        }

        let org_left_value: IrisFloatClassTag = IrisDev.get_native_object_ref<IrisFloatClassTag>(left_value);
        let finally_right_value: IrisFloatClassTag;

        if(need_cast) {
            finally_right_value = IrisDev.get_native_object_ref<IrisIntegerClassTag>(right_value).to_float();
        }
        else {
            finally_right_value = IrisDev.get_native_object_ref<IrisFloatClassTag>(right_value);
        }

        switch(type) {
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

        return cmp_result ? IrisDev.true() : IrisDev.false();
    }

    public static add(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisFloatClass.cast_operation(Operation.Add, caller, parameters[0]);
    }

    public static sub(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisFloatClass.cast_operation(Operation.Sub, caller, parameters[0]);
    }

    public static mul(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisFloatClass.cast_operation(Operation.Mul, caller, parameters[0]);
    }

    public static div(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisFloatClass.cast_operation(Operation.Div, caller, parameters[0]);
    }

    public static power(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisFloatClass.cast_operation(Operation.Power, caller, parameters[0]);
    }

    public static equal(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisFloatClass.cmp_operation(Operation.Equal, caller, parameters[0]);
    }
    
    public static not_equal(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisFloatClass.cmp_operation(Operation.NotEqual, caller, parameters[0]);
    }

    public static big_than(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return this.cmp_operation(Operation.BigThan, caller, parameters[0]);
    }

    public static big_than_or_equal(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisFloatClass.cmp_operation(Operation.BigThanOrEqual, caller, parameters[0]);
    }

    public static less_than(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisFloatClass.cmp_operation(Operation.LessThan, caller, parameters[0]);
    }

    public static less_than_or_equal(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisFloatClass.cmp_operation(Operation.LessThanOrEqual, caller, parameters[0]);
    }
}

export class IrisFloatClassTag {
    public float: number

    public constructor(float: number) {
        this.float = float;
    }

    public to_integer(): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.float);
    }

    public to_string(): string {
        return this.float.toString();
    }

    public add(value: IrisFloatClassTag): IrisFloatClassTag {
        return new IrisFloatClassTag(this.float + value.float);
    }
    
    public sub(value: IrisFloatClassTag): IrisFloatClassTag {
        return new IrisFloatClassTag(this.float - value.float);
    }

    public mul(value: IrisFloatClassTag): IrisFloatClassTag {
        return new IrisFloatClassTag(this.float * value.float);
    }

    public div(value: IrisFloatClassTag): IrisFloatClassTag {
        return new IrisFloatClassTag(this.float / value.float);
    }

    public power(value: IrisFloatClassTag): IrisFloatClassTag {
        return new IrisFloatClassTag(this.float ** value.float);
    }

    public equal(value: IrisFloatClassTag): boolean {
        return this.float == value.float;
    }

    public not_equal(value: IrisFloatClassTag): boolean {
        return !this.equal(value)
    }

    public big_than(value: IrisFloatClassTag): boolean {
        return this.float > value.float;
    }

    public big_than_or_equal(value: IrisFloatClassTag): boolean {
        return this.float >= value.float;
    }

    public less_than(value: IrisFloatClassTag): boolean {
        return this.float < value.float;
    }

    public less_than_or_equal(value: IrisFloatClassTag): boolean {
        return this.float <= value.float;
    }
}