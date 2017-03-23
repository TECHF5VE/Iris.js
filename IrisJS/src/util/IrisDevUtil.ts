import { IrisClass } from '../core/IrisClass'
import { IrisModule } from '../core/IrisModule'
import { IrisObject} from "../core/IrisObject"
import { IrisValue } from "../core/IrisValue"
import { IrisIntpr } from "./IrisInterpreter"
import { IrisContextEnvironment } from "../core/IrisContextEnvironment"
import { IrisThreadInfo } from "../core/IrisThreadInfo"
import { IrisCallSide } from "../core/IrisMethod"

export class IrisDevUtil {
    public get_class(path: string): IrisClass | null {
        return null;
    }   

    public get_module(path: string): IrisModule | null {
        return null;
    }

    public get_native_object_ref<T>(obj: IrisValue): T
    public get_native_object_ref<T>(obj: IrisObject): T
    public get_native_object_ref<T>(obj: any): any {
        if (obj instanceof IrisValue) {
            return ((obj.object as IrisObject).native_object as Object) as T;
        }
        else if (obj instanceof IrisObject) {
            return (obj.native_object as Object) as T;
        }
    }

    public check_is_class_object(obj: IrisValue): boolean {
        return (obj.object as IrisObject).class_object == this.get_class("Class");
    }

    public create_int(value: number): IrisValue {
        return (IrisIntpr.get_class("Interger") as IrisClass).create_new_instance(null, null, null);
    }

    public call_instance_method(obj: IrisValue, method_name: string, parameter_list: IrisValue[], context: IrisContextEnvironment | null, thread_info: IrisThreadInfo | null): IrisValue {
        return (obj.object as IrisObject).call_instance_method(method_name, parameter_list, context, thread_info, IrisCallSide.OutSide);
    }
}

const IrisDev: IrisDevUtil = new IrisDevUtil()

export { IrisDev }