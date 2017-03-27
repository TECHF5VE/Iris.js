import { IrisClass } from '../core/IrisClass';
import { IrisModule } from '../core/IrisModule';
import { IrisObject } from "../core/IrisObject";
import { IrisValue } from "../core/IrisValue";
import { IrisContextEnvironment } from "../core/IrisContextEnvironment";
import { IrisThreadInfo } from "../core/IrisThreadInfo";
export declare class IrisDevUtil {
    class_native_object: IrisClass;
    integer_native_object: IrisClass;
    float_native_object: IrisClass;
    get_class(path: string): IrisClass | undefined;
    get_module(path: string): IrisModule | undefined;
    get_native_object_ref<T>(obj: IrisValue): T;
    get_native_object_ref<T>(obj: IrisObject): T;
    check_is_class_object(obj: IrisValue): boolean;
    check_is_integer(obj: IrisValue): boolean;
    check_is_float(obj: IrisValue): boolean;
    create_int(value: number): IrisValue;
    get_int(value: IrisValue): number;
    create_float(value: number): IrisValue;
    get_float(value: IrisValue): number;
    call_instance_method(obj: IrisValue, method_name: string, parameter_list: IrisValue[], context: IrisContextEnvironment | undefined, thread_info: IrisThreadInfo | undefined): IrisValue;
    nil(): IrisValue;
    false(): IrisValue;
    true(): IrisValue;
}
declare const IrisDev: IrisDevUtil;
export { IrisDev };
