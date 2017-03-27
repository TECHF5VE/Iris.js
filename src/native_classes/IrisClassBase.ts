import { IrisNativeClassBase, IrisMethodDefineDescriptor } from "../interface/IrisNativeClassBase"
import { IrisClass } from "../core/IrisClass"
import { IrisModule } from "../core/IrisModule"
import { IrisDev } from "../util/IrisDevUtil"

export class IrisClassBase implements IrisNativeClassBase {
    public native_class_name_define(): string {
        return "Class";
    }

    public native_super_class_define(): IrisClass | undefined{
        return IrisDev.get_class("Object") as IrisClass;
    }

    public native_upper_module_define(): IrisModule | undefined {
        return undefined;
    }

    public native_alloc(): Object {
        return new IrisClassBaseTag();
    }

    public native_class_define(): IrisMethodDefineDescriptor[] {
        return [];
    }
}

export class IrisClassBaseTag {
    public class_object: IrisClass | undefined = undefined;
}