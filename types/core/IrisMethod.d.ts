import { IrisValue } from './IrisValue';
import { IrisContextEnvironment } from './IrisContextEnvironment';
import { IrisObject } from "./IrisObject";
import { IrisThreadInfo } from "./IrisThreadInfo";
export interface IrisNativeMethod {
    (caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
}
export declare enum IrisMethodAuthority {
    Everyone = 0,
    Relateive = 1,
    Personal = 2,
}
export declare enum IrisCallSide {
    InSide = 0,
    OutSide = 1,
}
export declare class IrisNativeMethodDescriptor {
    method_name: string;
    parameter_count: number;
    is_with_varaible_parameter: boolean;
    authority: IrisMethodAuthority;
    native_method_handle: IrisNativeMethod | undefined;
    constructor(method_name: string, parameter_count: number, is_with_varaible_parameter: boolean, authority: IrisMethodAuthority, native_method_handle: IrisNativeMethod);
}
export declare class IrisUserMethodDescriptor {
    method_name: string;
    parameter_name_list: string[];
    variable_parameter_name: string;
    with_block: Object | undefined;
    without_block: Object | undefined;
    constructor(method_name: string, parameter_name_list: string[], variable_parameter_name: string, with_block: Object | undefined, without_block: Object | undefined);
}
export declare class IrisMethod {
    name: string;
    authority: IrisMethodAuthority;
    parameter_amount: number;
    is_with_variable_parameter: boolean;
    object: IrisObject | undefined;
    method_content: IrisNativeMethod | IrisUserMethodDescriptor | undefined;
    constructor(method_defination: IrisNativeMethodDescriptor);
    constructor(method_defination: IrisUserMethodDescriptor);
    reset_method_object(): void;
    private create_method_object(method_class);
    private parameter_check(parameter_list);
    private create_new_context(caller, prameter_list, context, thread_info);
    call(caller: IrisValue, parameter_list: IrisValue[], context: IrisContextEnvironment | undefined, thread_info: IrisThreadInfo | undefined): IrisValue;
    call_main(parameter_list: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
}
