import { IrisNativeClassBase, IrisMethodDefineDescriptor } from "../interface/IrisNativeClassBase";
import { IrisClass } from "../core/IrisClass";
import { IrisModule } from "../core/IrisModule";
import { IrisValue } from "../core/IrisValue";
import { IrisContextEnvironment } from "../core/IrisContextEnvironment";
import { IrisThreadInfo } from "../core/IrisThreadInfo";
import { IrisIntegerClassTag } from "./IrisInteger";
export declare class IrisFloatClass implements IrisNativeClassBase {
    native_class_name_define(): string;
    native_super_class_define(): IrisClass | undefined;
    native_upper_module_define(): IrisModule | undefined;
    native_alloc(): Object;
    native_class_define(): IrisMethodDefineDescriptor[];
    private static cast_operation(type, left_value, right_value);
    private static cmp_operation(type, left_value, right_value);
    static add(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
    static sub(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
    static mul(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
    static div(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
    static power(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
    static equal(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
    static not_equal(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
    static big_than(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
    static big_than_or_equal(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
    static less_than(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
    static less_than_or_equal(caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
}
export declare class IrisFloatClassTag {
    float: number;
    constructor(float: number);
    to_integer(): IrisIntegerClassTag;
    to_string(): string;
    add(value: IrisFloatClassTag): IrisFloatClassTag;
    sub(value: IrisFloatClassTag): IrisFloatClassTag;
    mul(value: IrisFloatClassTag): IrisFloatClassTag;
    div(value: IrisFloatClassTag): IrisFloatClassTag;
    power(value: IrisFloatClassTag): IrisFloatClassTag;
    equal(value: IrisFloatClassTag): boolean;
    not_equal(value: IrisFloatClassTag): boolean;
    big_than(value: IrisFloatClassTag): boolean;
    big_than_or_equal(value: IrisFloatClassTag): boolean;
    less_than(value: IrisFloatClassTag): boolean;
    less_than_or_equal(value: IrisFloatClassTag): boolean;
}
