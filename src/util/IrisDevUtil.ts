import { IrisClass } from '../core/IrisClass';
import { IrisModule } from '../core/IrisModule';
import { IrisObject} from "../core/IrisObject"
import { IrisValue } from "../core/IrisValue"
import { IrisIntpr } from "./IrisInterpreter"
import { IrisContextEnvironment } from "../core/IrisContextEnvironment"
import { IrisThreadInfo } from "../core/IrisThreadInfo"
import { IrisCallSide } from "../core/IrisMethod"

import { IrisIntegerClassTag } from "../native_classes/IrisInteger";
import { IrisFloatClassTag } from "../native_classes/IrisFloat";

export class IrisDevUtil {

    public class_native_object: IrisClass;
    public integer_native_object: IrisClass;
    public float_native_object: IrisClass;

    public get_class(path: string): IrisClass | undefined {
        return IrisIntpr.get_class(path);
    }

    public get_module(path: string): IrisModule | undefined {
        return IrisIntpr.get_module(path);
    }

    public get_native_object_ref<T>(obj: IrisValue): T
    public get_native_object_ref<T>(obj: IrisObject): T
    public get_native_object_ref<T>(obj: any): any {
        if (obj instanceof IrisValue) {
            return ((obj.object as IrisObject).native_object as Object) as T;
        } else if (obj instanceof IrisObject) {
            return (obj.native_object as Object) as T;
        }
    }

    public check_is_class_object(obj: IrisValue): boolean {
        return (obj.object as IrisObject).class_object == this.class_native_object;
    }

    public check_is_integer(obj: IrisValue) : boolean {
        return (obj.object as IrisObject).class_object == this.integer_native_object; 
    }
    
    public check_is_float(obj: IrisValue) : boolean {
        return (obj.object as IrisObject).class_object == this.float_native_object; 
    }

    public create_int(value: number): IrisValue {
        let tmp: IrisValue = this.integer_native_object.create_new_instance(undefined, undefined, undefined);
        this.get_native_object_ref<IrisIntegerClassTag>(tmp).integer = Math.round(value);
        return tmp;
    }

    public get_int (value: IrisValue): number {
        if (this.check_is_integer(value)) {
            return this.get_native_object_ref<IrisIntegerClassTag>(value).integer;
        }
        return 0;
    }

    public create_float(value: number): IrisValue {
        let tmp: IrisValue = this.float_native_object.create_new_instance(undefined, undefined, undefined);
        this.get_native_object_ref<IrisFloatClassTag>(tmp).float = value;
        return tmp;
    }

    public get_float(value: IrisValue): number {
        if(this.check_is_float(value)) {
            return this.get_native_object_ref<IrisFloatClassTag>(value).float;
        }
        return 0.0;
    }

    public call_instance_method(obj: IrisValue, method_name: string, parameter_list: IrisValue[], context: IrisContextEnvironment | undefined, thread_info: IrisThreadInfo | undefined): IrisValue {
        return (obj.object as IrisObject).call_instance_method(method_name, parameter_list, context, thread_info, IrisCallSide.OutSide);
    }

    public nil (): IrisValue {
        return IrisIntpr.nil;
    }

    public false (): IrisValue {
        return IrisIntpr.false;
    }

    public true (): IrisValue {
        return IrisIntpr.true;
    }
}

const IrisDev: IrisDevUtil = new IrisDevUtil()

export { IrisDev }
