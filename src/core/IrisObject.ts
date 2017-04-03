import { IrisClass } from './IrisClass';
import { IrisMethod, IrisCallSide, IrisMethodAuthority } from './IrisMethod';
import { IrisValue } from './IrisValue';
import { IrisContextEnvironment } from './IrisContextEnvironment';
import { IrisThreadInfo } from './IrisThreadInfo';
import { IrisRunningObject } from './IrisRunningObject';
import { IrisDev } from '../util/IrisDevUtil';

export class IrisObject implements IrisRunningObject {
    private static _OBJECT_COUNT: number = 0;
    public static get OBJECT_COUNT(): number { return IrisObject._OBJECT_COUNT; }

    public class_object: IrisClass | undefined = undefined;
    public native_object: Object | undefined = undefined;

    private _object_id: number;
    private instance_methods: Map<string, IrisMethod> = new Map<string, IrisMethod>();
    private instance_variables: Map<string, IrisValue> = new Map<string, IrisValue>();

    constructor () {
        this._object_id = ++IrisObject._OBJECT_COUNT;
    }

    public get object_id (): number {
        return this._object_id;
    }

    public call_instance_method (method_name: string, parameter_list: IrisValue[], context: IrisContextEnvironment | undefined, thread_info: IrisThreadInfo | undefined, callSide: IrisCallSide): IrisValue {
        //return new IrisValue()
        let method: IrisMethod | undefined = undefined;
        let is_current_method: boolean = false;

        let result: any = {
            method: undefined,
            is_current_method: false,
        };

        if (this.instance_methods.has(method_name)) {
            method = this.instance_methods.get(method_name) as IrisMethod;
            is_current_method = true;
        } else {
            (this.class_object as IrisClass).get_method(method_name, result);
        }

        method = result.method;
        is_current_method = result.is_current_method;

        if (method === undefined) {
            // Error
            return IrisDev.nil();
        }

        let call_result: IrisValue;
        let caller: IrisValue = IrisValue.wrap_object(this);

        if (callSide === IrisCallSide.InSide) {
            if (is_current_method) {
                call_result = method.call(caller, parameter_list, context, thread_info);
            } else {
                if (method.authority === IrisMethodAuthority.Personal) {
                    // Error
                    call_result = IrisDev.nil();
                } else {
                    call_result = method.call(caller, parameter_list, context, thread_info);
                }
            }
        } else {
            if (method.authority !== IrisMethodAuthority.Everyone) {
                // Error
                call_result = IrisDev.nil();
            } else {
                call_result = method.call(caller, parameter_list, context, thread_info);
            }
        }
        return call_result;
    }

    public add_instance_method (method: IrisMethod): void {
        this.instance_methods.set(method.name, method);
    }

    public add_instance_variable (name: string, value: IrisValue): void {
        this.instance_variables.set(name, value);
    }

    public reset_all_methods_objcet () {
        for (let [name, method] of this.instance_methods) {
            method.reset_method_object();
        }
    }
}
