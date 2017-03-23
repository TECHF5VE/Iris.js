import { IrisClass } from "./IrisClass";
import { IrisMethod, IrisCallSide } from "./IrisMethod";
import { IrisValue } from "./IrisValue";
import { IrisContextEnvironment } from "./IrisContextEnvironment";
import { IrisThreadInfo } from "./IrisThreadInfo";
import { IrisRunningObject } from "./IrisRunningObject";
export declare class IrisObject implements IrisRunningObject {
    private static _OBJECT_COUNT;
    static readonly OBJECT_COUNT: number;
    class_object: IrisClass | null;
    native_object: Object | null;
    private _object_id;
    readonly object_id: number;
    private instance_methods;
    private instance_variables;
    constructor();
    call_instance_method(method_name: string, parameter_list: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo, call_side: IrisCallSide): IrisValue;
    add_instance_method(method: IrisMethod): void;
    add_instance_variable(name: string, value: IrisValue): void;
    reset_all_methods_objcet(): void;
}
