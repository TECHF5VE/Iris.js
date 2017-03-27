import { IrisNativeClassBase, IrisMethodDefineDescriptor } from "../interface/IrisNativeClassBase";
import { IrisClass } from "../core/IrisClass";
import { IrisModule } from "../core/IrisModule";
import { IrisValue } from "../core/IrisValue";
import { IrisContextEnvironment } from "../core/IrisContextEnvironment";
import { IrisThreadInfo } from "../core/IrisThreadInfo";
export declare class IrisObjectBase implements IrisNativeClassBase {
    native_class_name_define(): string;
    native_super_class_define(): IrisClass | undefined;
    native_upper_module_define(): IrisModule | undefined;
    native_alloc(): Object;
    native_class_define(): IrisMethodDefineDescriptor[];
    static format(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue;
}
export declare class IrisObjectBaseTag {
}
