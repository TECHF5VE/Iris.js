import { IrisNativeClassBase, IrisMethodDefineDescriptor } from "../interface/IrisNativeClassBase"
import { IrisClass } from "../core/IrisClass"
import { IrisModule } from "../core/IrisModule"
import { IrisDev } from "../util/IrisDevUtil"
import { IrisValue } from "../core/IrisValue"
import { IrisContextEnvironment } from "../core/IrisContextEnvironment"
import { IrisThreadInfo } from "../core/IrisThreadInfo"
import { IrisMethodAuthority } from "../core/IrisMethod"

export class IrisObjectBase implements IrisNativeClassBase {
    public native_class_name_define(): string {
        return "Object";
    }

    public native_super_class_define(): IrisClass | undefined {
        return undefined;
    }

    public native_upper_module_define(): IrisModule | undefined {
        return undefined;
    }

    public native_alloc(): Object {
        return new IrisObjectBaseTag();
    }

    public native_class_define(): IrisMethodDefineDescriptor[] {
        return [
            { method_name: "__format", native_method: IrisObjectBase.format, parameter_amount: 0, is_with_variable_parameter: true, authority: IrisMethodAuthority.Everyone },
        ];
    }

    public static format(caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment, thread_info: IrisThreadInfo): IrisValue {
        return caller;
    }

}

export class IrisObjectBaseTag {

}