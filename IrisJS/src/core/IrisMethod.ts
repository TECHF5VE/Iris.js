import { IrisValue } from './IrisValue'
import { IrisContextEnvironment } from './IrisContextEnvironment'
import { IrisObject } from "./IrisObject"

export interface IrisNativeMethod {
    (caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment): IrisValue;
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

export class IrisNativeMethodDescriptor {
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


export class IrisUserMethodDescriptor {
    public method_name: string = "";
    public parameter_name_list: string[] = [];
    public variable_parameter_name: string = "";
    // reserved
    public with_block: Object | null;
    public without_block: Object | null;

    public constructor(method_name: string, parameter_name_list: string[], variable_parameter_name: string, with_block: Object | null, without_block: Object | null ) {
        this.method_name = method_name;
        this.parameter_name_list = parameter_name_list;
        this.variable_parameter_name = variable_parameter_name;
        this.with_block = with_block;
        this.without_block = without_block;
    }
}

export class IrisMethod {

    public name: string;
    public authority: IrisMethodAuthority = IrisMethodAuthority.Everyone;
    public parameter_amount: number = 0;
    public is_with_variable_parameter: boolean = false;
    public object: IrisObject | null = null;

    public method_content: IrisNativeMethod | IrisUserMethodDescriptor | null = null;

    public reset_method_object(): void{

    }

    public constructor(method_defination: IrisNativeMethodDescriptor)
    public constructor(method_defination: IrisUserMethodDescriptor)
    public constructor(method_defination: any)
    {
        if (method_defination instanceof IrisNativeMethodDescriptor) {
            this.name = method_defination.method_name;
            this.authority = method_defination.authority;
            this.is_with_variable_parameter = method_defination.is_with_varaible_parameter;
            this.parameter_amount = method_defination.parameter_count;
            this.method_content = method_defination.native_method_handle;
        }
        else if (method_defination instanceof IrisUserMethodDescriptor) {
            this.name = method_defination.method_name;
            this.is_with_variable_parameter = method_defination.variable_parameter_name == "";
            this.parameter_amount = method_defination.parameter_name_list.length;
            this.method_content = method_defination;
        }
    }
}