import { IrisClass } from '../core/IrisClass'
import { IrisModule } from '../core/IrisModule'
import { IrisNativeMethod, IrisMethodAuthority } from '../core/IrisMethod';

export interface IrisAllocFunc {
    (): Object;
}

export class IrisMethodDefineDescriptor {
    public method_name: string;
    public native_method: IrisNativeMethod;
    public parameter_amount: number;
    public is_with_variable_parameter: boolean;
    public authority: IrisMethodAuthority;

    public constructor () {

    }
}

export interface IrisNativeClassBase {
    native_class_name_define(): string;
    native_super_class_define(): IrisClass | undefined;
    native_upper_module_define(): IrisModule | undefined;
    native_alloc: IrisAllocFunc;
    native_class_define(): IrisMethodDefineDescriptor[];
}
