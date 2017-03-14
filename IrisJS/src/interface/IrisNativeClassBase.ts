import { IrisClass } from "../core/IrisClass"
import { IrisModule } from "../core/IrisModule"

export interface IrisAllocFunc {
    (): Object;
}

export interface IrisNativeClassBase {
    native_class_name_define(): string;
    native_super_class_define(): IrisClass;
    native_upper_module_define(): IrisModule;
    native_alloc: IrisAllocFunc;
    native_class_define(class_obj: IrisClass): void;
}