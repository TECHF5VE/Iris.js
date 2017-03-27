import { IrisObject } from './IrisObject';
import { IrisModule } from './IrisModule';
import { IrisMethod } from './IrisMethod';
import { IrisValue } from './IrisValue';
import { IrisContextEnvironment } from './IrisContextEnvironment';
import { IrisThreadInfo } from './IrisThreadInfo';
import { IrisNativeClassBase } from '../interface/IrisNativeClassBase';
import { IrisMethodDefineDescriptor } from "../interface/IrisNativeClassBase";
export declare class IrisClass {
    name: string;
    super_class: IrisClass | undefined;
    upper_module: IrisModule | undefined;
    private involved_modules;
    private involved_interfaces;
    private instance_methods;
    private constances;
    private object_alloc_method;
    object: IrisObject | undefined;
    constructor(extern_class: IrisNativeClassBase);
    reset_all_methods_object(): void;
    create_new_instance(parameter_list: IrisValue[] | undefined, context: IrisContextEnvironment | undefined, threadInfo: IrisThreadInfo | undefined): IrisValue;
    add_instance_method(param: IrisMethodDefineDescriptor): void;
    add_instance_method(param: IrisMethod): void;
    private inner_search_class_module_method(class_obj, method_name);
    private inner_get_method(class_obj, method_name);
    get_method(method_name: string, result: {
        method: IrisMethod | undefined;
        is_current_class_method: boolean;
    }): void;
}
