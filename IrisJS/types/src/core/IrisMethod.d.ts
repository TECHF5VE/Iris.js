import { IrisValue } from "./IrisValue";
import { IrisContextEnvironment } from "./IrisContextEnvironment";
export interface IrisNativeMethod {
    (caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment): IrisValue;
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
export declare class IrisNativeMethod {
    method_name: string;
    parameter_count: number;
    is_with_varaible_parameter: boolean;
    authority: IrisMethodAuthority;
    native_method_handle: IrisNativeMethod | null;
    constructor(method_name: string, parameter_count: number, is_with_varaible_parameter: boolean, authority: IrisMethodAuthority, native_method_handle: IrisNativeMethod);
}
export declare class IrisUserMethod {
    method_name: string;
    parameter_name_list: string[];
    variable_parameter_name: string;
    with_block: Object | null;
    without_block: Object | null;
    constructor(method_name: string, parameter_name_list: string[], variable_parameter_name: string, with_block: Object | null, without_block: Object | null);
}
export declare class IrisMethod {
}
