import { IrisClass } from './IrisClass';
import { IrisMethod, IrisCallSide } from './IrisMethod';
import { IrisValue } from './IrisValue';
import { IrisContextEnvironment } from './IrisContextEnvironment';
import { IrisThreadInfo } from './IrisThreadInfo';
import { IrisRunningObject } from './IrisRunningObject';
export declare class IrisObject implements IrisRunningObject {
    private static _OBJECT_COUNT;
    static readonly OBJECT_COUNT: number;
    classObject: IrisClass | null;
    nativeObject: Object | null;
    private _objectId;
    readonly object_id: number;
    private instanceMethods;
    private instanceVariables;
    constructor();
    call_instance_method(methodName: string, parameterList: IrisValue[], context: IrisContextEnvironment, threadInfo: IrisThreadInfo, callSide: IrisCallSide): IrisValue;
    add_instance_method(method: IrisMethod): void;
    add_instance_variable(name: string, value: IrisValue): void;
    reset_all_methods_objcet(): void;
}
