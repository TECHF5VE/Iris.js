import { IrisValue } from "./IrisValue"
import { IrisContextEnvironment } from "./IrisContextEnvironment"

export interface IrisNativeMethod {
    (caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment): IrisValue;
}

export enum IrisMethodAuthority {
    Everyone,
    Relateive,
    Personal,
}

export enum IrisCallSide {
    InSide,
    OutSide,
}

export class IrisNativeMethod {
    public method_name: string = "";
    public parameter_count: number = 0;
    public is_with_varaible_parameter: boolean = false;
    public authority: IrisMethodAuthority = IrisMethodAuthority.Everyone;
    public native_method_handle: IrisNativeMethod | null = null;

    public constructor(method_name: string, parameter_count: number, is_with_varaible_parameter: boolean, authority: IrisMethodAuthority, native_method_handle: IrisNativeMethod) {
        this.method_name = method_name;
        this.parameter_count = parameter_count;
        this.is_with_varaible_parameter = is_with_varaible_parameter;
        this.authority = authority;
        this.native_method_handle = native_method_handle;
    }
}


export class IrisUserMethod {
    public method_name: string = "";
    public parameter_name_list: string[] = [];
    public variable_parameter_name: string = "";
    // reserved
    public with_block: Object | null;
    public without_block: Object | null;

    public constructor(method_name: string, parameter_name_list: string[], variable_parameter_name: string, with_block: Object | null, without_block: Object | null) {
        this.method_name = method_name;
        this.parameter_name_list = parameter_name_list;
        this.variable_parameter_name = variable_parameter_name;
        this.with_block = with_block;
        this.without_block = without_block;
    }
}

export class IrisMethod {
    
}