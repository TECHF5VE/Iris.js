import { IrisNativeClassBase, IrisMethodDefineDescriptor } from "../interface/IrisNativeClassBase";
import { IrisClass } from "../core/IrisClass";
import { IrisModule } from "../core/IrisModule";
import { IrisMethod } from "../core/IrisMethod";
export declare class IrisMethodBase implements IrisNativeClassBase {
    native_class_name_define(): string;
    native_super_class_define(): IrisClass | undefined;
    native_upper_module_define(): IrisModule | undefined;
    native_alloc(): Object;
    native_class_define(): IrisMethodDefineDescriptor[];
}
export declare class IrisMethodBaseTag {
    method: IrisMethod | undefined;
}
