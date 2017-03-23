import { IrisClass } from '../core/IrisClass'
import { IrisModule } from '../core/IrisModule'
import { IrisNativeMethod, IrisMethodAuthority } from "../core/IrisMethod"

export interface IrisAllocFunc {
    (): Object
}

export class IrisMethodDefineDescriptor {
    public method_name: string;
    public native_method: IrisNativeMethod;
    public parameter_amount: number;
    public is_with_variable_parameter: boolean;
    public authority: IrisMethodAuthority;
}

export interface IrisNativeClassBase {
    native_class_name_define(): string
    native_super_class_define(): IrisClass | null
    native_upper_module_define(): IrisModule | null
    native_alloc: IrisAllocFunc
    native_class_define(): IrisMethodDefineDescriptor[]
}