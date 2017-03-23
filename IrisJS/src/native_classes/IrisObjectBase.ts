import { IrisNativeClassBase, IrisMethodDefineDescriptor } from "../interface/IrisNativeClassBase"
import { IrisClass } from "../core/IrisClass"
import { IrisModule } from "../core/IrisModule"
import { IrisDev } from "../util/IrisDevUtil"

export class IrisObjectBase implements IrisNativeClassBase {
    public native_class_name_define(): string {
        return "Object";
    }

    public native_super_class_define(): IrisClass | null {
        return null;
    }

    public native_upper_module_define(): IrisModule | null {
        return null;
    }

    public native_alloc(): Object {
        return new IrisObjectBaseTag();
    }

    public native_class_define(): IrisMethodDefineDescriptor[] {
        return [];
    }

}

export class IrisObjectBaseTag {

}