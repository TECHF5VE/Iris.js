import { IrisValue } from './IrisValue'
import { IrisContextEnvironment } from './IrisContextEnvironment'
import { IrisObject } from "./IrisObject"
import { IrisClass } from "./IrisClass"
import { IrisDev } from "../util/IrisDevUtil"
import { IrisMethodBaseTag } from "../native_classes/IrisMethodBase"
import { IrisThreadInfo } from "./IrisThreadInfo"

export interface IrisNativeMethod {
    (caller: IrisValue, parameters: IrisValue[], variableParameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
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
    public native_method_handle: IrisNativeMethod | undefined = undefined;
    //;

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
    public with_block: Object | undefined;
    public without_block: Object | undefined;

    public constructor(method_name: string, parameter_name_list: string[], variable_parameter_name: string, with_block: Object | undefined, without_block: Object | undefined ) {
        this.method_name = method_name;
        this.parameter_name_list = parameter_name_list;
        this.variable_parameter_name = variable_parameter_name;
        this.with_block = with_block;
        this.without_block = without_block;
    }
}

export class IrisMethod {

    public name: string = "";
    public authority: IrisMethodAuthority = IrisMethodAuthority.Everyone;
    public parameter_amount: number = 0;
    public is_with_variable_parameter: boolean = false;
    public object: IrisObject | undefined = undefined;

    public method_content: IrisNativeMethod | IrisUserMethodDescriptor | undefined = undefined;

    public constructor(method_defination: IrisNativeMethodDescriptor)
    public constructor(method_defination: IrisUserMethodDescriptor)
    public constructor(method_defination: any) {
        if (method_defination instanceof IrisNativeMethodDescriptor) {
            this.name = method_defination.method_name;
            this.authority = method_defination.authority;
            this.is_with_variable_parameter = method_defination.is_with_varaible_parameter;
            this.parameter_amount = method_defination.parameter_count;
            this.method_content = method_defination.native_method_handle;

            let method_class: IrisClass | undefined = IrisDev.get_class("Method");

            if (method_class != undefined) {
                this.create_method_object(method_class);
            }

        }
        else if (method_defination instanceof IrisUserMethodDescriptor) {
            this.name = method_defination.method_name;
            this.is_with_variable_parameter = method_defination.variable_parameter_name == "";
            this.parameter_amount = method_defination.parameter_name_list.length;
            this.method_content = method_defination;

            this.create_method_object(IrisDev.get_class("Method") as IrisClass);

        }
    }

    public reset_method_object(): void {
        this.create_method_object(IrisDev.get_class("Method") as IrisClass);
    }

    private create_method_object(method_class: IrisClass): void {
        let method_obj: IrisValue = method_class.create_new_instance(undefined, undefined, undefined);
        IrisDev.get_native_object_ref<IrisMethodBaseTag>(method_obj).method = this;
        this.object = method_obj.object;
    }

    private parameter_check(parameter_list: IrisValue[]): boolean {
        if (parameter_list.length != 0) {
            if (this.is_with_variable_parameter) {
                return parameter_list.length >= this.parameter_amount;
            }
            else {
                return parameter_list.length == this.parameter_amount;
            }
        }
        else {
            return this.parameter_amount == 0;
        }
    }
    private create_new_context(caller: IrisObject | undefined, prameter_list: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo) {
        return new IrisContextEnvironment();
    }

    public call(caller: IrisValue, parameter_list: IrisValue[], context: IrisContextEnvironment | undefined, thread_info : IrisThreadInfo | undefined): IrisValue {
        let result: IrisValue = IrisDev.nil();

        if (!this.parameter_check(parameter_list)) {
            /* Error */
            return IrisDev.nil();
        }

        let new_context: IrisContextEnvironment = this.create_new_context(caller.object, parameter_list, context as IrisContextEnvironment, thread_info as IrisThreadInfo);

        if (typeof this.method_content == "function") {
            let variable_values: IrisValue[];
            let normal_values: IrisValue[];
            if (parameter_list.length > this.parameter_amount) {
                variable_values = parameter_list.slice(this.parameter_amount, parameter_list.length);
            }
            else {
                variable_values = [];
            }

            if (this.parameter_amount > 0) {
                normal_values = parameter_list.slice(0, this.parameter_amount);
            }
            else {
                normal_values = [];
            }
            result = this.method_content(caller, normal_values, variable_values, new_context as IrisContextEnvironment, thread_info as IrisThreadInfo);
        }
        else {
            ;
        }

        return result;
    }

    public call_main(parameter_list: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo) {
        if (!this.parameter_check(parameter_list)) {
            /* Error */
            return IrisDev.nil();
        }

        let new_context: IrisContextEnvironment = this.create_new_context(undefined, parameter_list, context, thread_info);

        return IrisDev.nil();
    }

}