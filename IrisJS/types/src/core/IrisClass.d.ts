import { IrisObject } from "./IrisObject";
import { IrisValue } from "./IrisValue";
import { IrisContextEnvironment } from "./IrisContextEnvironment";
import { IrisThreadInfo } from "./IrisThreadInfo";
import { IrisNativeClassBase } from "../interface/IrisNativeClassBase";
export declare class IrisClass {
    private class_name;
    private super_class;
    private upper_module;
    private involved_modules;
    private involved_interfaces;
    private instance_method;
    private constances;
    private object_alloc_method;
    object: IrisObject | null;
    constructor(extern_class: IrisNativeClassBase);
    reset_all_methods_object(): void;
    create_new_instance(parameter_list: IrisValue[] | null, context: IrisContextEnvironment | null, thread_info: IrisThreadInfo | null): IrisValue;
}
