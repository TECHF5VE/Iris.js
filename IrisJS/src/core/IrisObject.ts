import { IrisClass } from './IrisClass'
import { IrisMethod, IrisCallSide } from './IrisMethod'
import { IrisValue } from './IrisValue'
import { IrisContextEnvironment } from './IrisContextEnvironment'
import { IrisThreadInfo } from './IrisThreadInfo'
import { IrisRunningObject } from './IrisRunningObject'

export class IrisObject implements IrisRunningObject {
    private static _OBJECT_COUNT: number = 0
    public static get OBJECT_COUNT(): number { return IrisObject._OBJECT_COUNT }

    public class_object: IrisClass | null = null
    public native_object: Object | null = null

    private _object_id: number

    public get object_id(): number {
        return this._object_id
    }

    private instanceMethods: Map<string, IrisMethod> = new Map<string, IrisMethod>()
    private instanceVariables: Map<string, IrisValue> = new Map<string, IrisValue>()


    constructor() {
        this._object_id = ++IrisObject._OBJECT_COUNT
    }

    public call_instance_method(methodName: string, parameterList: IrisValue[], context: IrisContextEnvironment | null, threadInfo: IrisThreadInfo | null, callSide: IrisCallSide): IrisValue {
        return new IrisValue()
    }

    public add_instance_method(method: IrisMethod): void {

    }
    public add_instance_variable(name: string, value: IrisValue): void {

    }

    public reset_all_methods_objcet() {

    }
}
