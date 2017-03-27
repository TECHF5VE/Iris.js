import { IrisNativeClassBase, IrisMethodDefineDescriptor } from "../interface/IrisNativeClassBase"
import { IrisClass } from "../core/IrisClass"
import { IrisModule } from "../core/IrisModule"
import { IrisDev } from "../util/IrisDevUtil"
import { IrisFloatClassTag } from "./IrisFloat"
import { IrisValue} from "../core/IrisValue"
import { IrisContextEnvironment} from "../core/IrisContextEnvironment"
import { IrisThreadInfo } from "../core/IrisThreadInfo"
import { IrisObject } from "../core/IrisObject"
import { IrisMethodAuthority } from "../core/IrisMethod"

enum Operation {
    Add,
    Sub,
    Mul,
    Div,
    Power,
    Mod,

    Shr,
    Shl,
    Sar,
    Sal,
    BitXor,
    BitAnd,
    BitOr,

    Equal,
    NotEqual,
    BigThan,
    BigThanOrEqual,
    LessThan,
    LessThanOrEqual,
};

export class IrisIntegerClass implements IrisNativeClassBase {
    public native_class_name_define(): string {
        return "Integer";
    }

    public native_super_class_define(): IrisClass | undefined {
        return IrisDev.get_class("Object") as IrisClass;
    }

    public native_upper_module_define(): IrisModule | undefined {
        return undefined;
    }

    public native_alloc(): Object {
        return new IrisIntegerClassTag(0);
    }

    public native_class_define(): IrisMethodDefineDescriptor[] {
        return [
            { method_name: "+", native_method: IrisIntegerClass.add, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "-", native_method: IrisIntegerClass.sub, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "*", native_method: IrisIntegerClass.mul, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "/", native_method: IrisIntegerClass.div, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "%", native_method: IrisIntegerClass.mod, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "**", native_method: IrisIntegerClass.power, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },

            { method_name: "==", native_method: IrisIntegerClass.equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "!=", native_method: IrisIntegerClass.not_equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: ">", native_method: IrisIntegerClass.big_than, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: ">=", native_method: IrisIntegerClass.big_than_or_equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "<", native_method: IrisIntegerClass.less_than, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "<=", native_method: IrisIntegerClass.less_than_or_equal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },

            { method_name: ">>", native_method: IrisIntegerClass.shr, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: ">>>", native_method: IrisIntegerClass.sar, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "<<", native_method: IrisIntegerClass.shl, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "<<<", native_method: IrisIntegerClass.sal, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "^", native_method: IrisIntegerClass.bit_xor, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "&", native_method: IrisIntegerClass.bit_and, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
            { method_name: "|", native_method: IrisIntegerClass.bit_or, parameter_amount: 1, is_with_variable_parameter: false, authority: IrisMethodAuthority.Everyone },
        ];
    }

    private static cast_operation(type: Operation, left_value: IrisValue, right_value: IrisValue) {
        let result: IrisValue;
        let need_cast: boolean = IrisDev.check_is_float(right_value);

        if(need_cast) {
            if(type != Operation.Mod) {
                let cast_left_value = IrisDev.get_native_object_ref<IrisIntegerClassTag>(left_value).to_float();
                let org_right_value = IrisDev.get_native_object_ref<IrisFloatClassTag>(right_value);
                let result_value: IrisFloatClassTag | undefined = undefined;

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

                result = IrisDev.create_float(0.0);
                (result.object as IrisObject).native_object = org_right_value;
            }
            else {
                let cast_right_value: IrisIntegerClassTag = IrisDev.get_native_object_ref<IrisFloatClassTag>(right_value).to_integer();
                let org_left_value: IrisIntegerClassTag = IrisDev.get_native_object_ref<IrisIntegerClassTag>(left_value);
                let result_value = org_left_value.mod(cast_right_value);
                result = IrisDev.create_int(0);
                (result.object as IrisObject).native_object = result_value;
            }
        }
        else {
            let org_left_value: IrisIntegerClassTag = IrisDev.get_native_object_ref<IrisIntegerClassTag>(left_value);
            let org_right_value: IrisIntegerClassTag = IrisDev.get_native_object_ref<IrisIntegerClassTag>(right_value);
            let result_value: IrisIntegerClassTag | undefined = undefined;
            switch(type) {
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
            result = IrisDev.create_int(0);
            (result.object as IrisObject).native_object = result_value;
        }
        return result;
    }

    private static cmp_operation(type: Operation, left_value: IrisValue, right_value: IrisValue): IrisValue {
        let need_cast: boolean = IrisDev.check_is_float(right_value);
        let cmp_result: boolean = false;

        if(need_cast) {
            let cast_left_value: IrisFloatClassTag = IrisDev.get_native_object_ref<IrisIntegerClassTag>(left_value).to_float();
            let org_right_value: IrisFloatClassTag = IrisDev.get_native_object_ref<IrisFloatClassTag>(right_value);

            switch(type){
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
            let org_left_value: IrisIntegerClassTag = IrisDev.get_native_object_ref<IrisIntegerClassTag>(left_value);
            let org_right_value: IrisIntegerClassTag = IrisDev.get_native_object_ref<IrisIntegerClassTag>(right_value);

            switch(type){
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

        return cmp_result ? IrisDev.true() : IrisDev.false();
    }

    private bit_operation(type: Operation, left_value: IrisValue, right_value: IrisValue): IrisValue {
        if(!IrisDev.check_is_integer(right_value)) {
            // Error
            return IrisDev.nil();
        }

        let org_left_value: IrisIntegerClassTag = IrisDev.get_native_object_ref<IrisIntegerClassTag>(left_value);
        let org_right_value: IrisIntegerClassTag = IrisDev.get_native_object_ref<IrisIntegerClassTag>(left_value);
        let result_value: IrisIntegerClassTag | undefined = undefined;

		switch(type) {
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

        let result: IrisValue = IrisDev.create_int(0);
        (result.object as IrisObject).native_object = result_value;
        return result
    }

    public static add(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cast_operation(Operation.Add, caller, parameters[0]);
    }

    public static sub(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cast_operation(Operation.Sub, caller, parameters[0]);
    }

    public static mul(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cast_operation(Operation.Mul, caller, parameters[0]);
    }

    public static div(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cast_operation(Operation.Div, caller, parameters[0]);
    }

    public static mod(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cast_operation(Operation.Mod, caller, parameters[0]);
    }

    public static power(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cast_operation(Operation.Power, caller, parameters[0]);
    }

    public static equal(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cmp_operation(Operation.Equal, caller, parameters[0]);
    }

    public static not_equal(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cmp_operation(Operation.NotEqual, caller, parameters[0]);
    }

    public static big_than(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cmp_operation(Operation.BigThan, caller, parameters[0]);
    }

    public static big_than_or_equal(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cmp_operation(Operation.BigThanOrEqual, caller, parameters[0]);
    }

    public static less_than(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cmp_operation(Operation.LessThan, caller, parameters[0]);
    }

    public static less_than_or_equal(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cmp_operation(Operation.LessThanOrEqual, caller, parameters[0]);
    }

    public static shr(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cmp_operation(Operation.Shr, caller, parameters[0]);
    }

    public static sar(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cmp_operation(Operation.Sar, caller, parameters[0]);
    }

    public static shl(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cmp_operation(Operation.Shl, caller, parameters[0]);
    }

    public static sal(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cmp_operation(Operation.Sal, caller, parameters[0]);
    }

    public static bit_xor(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cmp_operation(Operation.BitXor, caller, parameters[0]);
    }

    public static bit_or(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cmp_operation(Operation.BitOr, caller, parameters[0]);
    }

    public static bit_and(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return IrisIntegerClass.cmp_operation(Operation.BitAnd, caller, parameters[0]);
    }

}

export class IrisIntegerClassTag {
    public integer: number = 0;

    public to_float(): IrisFloatClassTag {
        return new IrisFloatClassTag(this.integer * 1.0);
    }

    public to_string(): string {
        return this.integer.toString();
    }

    public constructor(integer: number) {
        this.integer = Math.round(integer);
    }

    public add(value: IrisIntegerClassTag): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.integer + value.integer);
    }

    public sub(value: IrisIntegerClassTag): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.integer - value.integer);
    }
    
    public mul(value: IrisIntegerClassTag): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.integer * value.integer);
    }

    public div(value: IrisIntegerClassTag): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.integer / value.integer);
    }

    public power(value: IrisIntegerClassTag): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.integer ** value.integer);
    }

    public mod(value: IrisIntegerClassTag): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.integer % value.integer);
    }

    public shr(value: IrisIntegerClassTag): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.integer >> value.integer);
    }

    public shl(value: IrisIntegerClassTag): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.integer << value.integer);
    }

    public sar(value: IrisIntegerClassTag): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.integer >>> value.integer);
    }

    public sal(value: IrisIntegerClassTag): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.integer << value.integer);
    }

    public bit_xor(value: IrisIntegerClassTag): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.integer ^ value.integer);
    }

    public bit_and(value: IrisIntegerClassTag): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.integer & value.integer);
    }

    public bit_or(value: IrisIntegerClassTag): IrisIntegerClassTag {
        return new IrisIntegerClassTag(this.integer | value.integer);
    }

    public equal(value: IrisIntegerClassTag): boolean {
        return this.integer == value.integer;
    }

    public not_equal(value: IrisIntegerClassTag): boolean {
        return !this.equal(value);
    }

    public big_than(value: IrisIntegerClassTag): boolean {
        return this.integer > value.integer;
    }

    public big_than_or_equal(value: IrisIntegerClassTag): boolean {
        return this.integer >= value.integer;
    }

    public less_than(value: IrisIntegerClassTag): boolean {
        return this.integer < value.integer;
    }

    public less_than_or_equal(value: IrisIntegerClassTag): boolean {
        return this.integer <= value.integer;
    }
}