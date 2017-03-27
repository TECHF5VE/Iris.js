import { IrisClass } from '../core/IrisClass';
import { IrisModule } from '../core/IrisModule';
import { IrisNativeMethod, IrisMethodAuthority } from "../core/IrisMethod";
export interface IrisAllocFunc {
    (): Object;
}
export declare class IrisMethodDefineDescriptor {
    method_name: string;
    native_method: IrisNativeMethod;
    parameter_amount: number;
    is_with_variable_parameter: boolean;
    authority: IrisMethodAuthority;
    constructor();
}
export interface IrisNativeClassBase {
    native_class_name_define(): string;
    native_super_class_define(): IrisClass | undefined;
    native_upper_module_define(): IrisModule | undefined;
    native_alloc: IrisAllocFunc;
    native_class_define(): IrisMethodDefineDescriptor[];
}
