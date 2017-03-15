import { IrisObject } from "./IrisObject"
import { IrisModule } from "./IrisModule"
import { IrisInterface } from "./IrisInterface"
import { IrisMethod, IrisNativeMethod } from "./IrisMethod"
import { IrisValue } from "./IrisValue"
import { IrisContextEnvironment } from "./IrisContextEnvironment"
import { IrisThreadInfo } from "./IrisThreadInfo"
import { IrisAllocFunc, IrisNativeClassBase } from "../interface/IrisNativeClassBase"
import { IrisDev } from "../util/IrisDevUtil"

export class IrisClass {

    private class_name: string = "";
    private super_class: IrisClass | null = null;
    private upper_module: IrisModule | null = null;

    private involved_modules: Set<IrisModule> = new Set<IrisModule>();
    private involved_interfaces: Set<IrisInterface> = new Set<IrisInterface>();
    private instance_method: Map<string, IrisMethod> = new Map<string, IrisMethod>();
    private constances: Map<string, IrisValue> = new Map<string, IrisValue>();

    private object_alloc_method: IrisAllocFunc | null = null;

    public object: IrisObject | null = null;

    public constructor(extern_class: IrisNativeClassBase) {
        this.object_alloc_method = extern_class.native_alloc;

        let class_obj: IrisClass | null = IrisDev.get_class("Class");

        if (class_obj != null) {
            this.object = class_obj.create_new_instance(null, null, null).object;
            //(tmpObj.native_object as IrisClassBase.IrisClassBasTag).class_object = this
        }
        else {
            this.object = new IrisObject();
            let tmpObj: IrisObject = this.object as IrisObject;
            tmpObj.class_object = this;
            tmpObj.native_object = extern_class.native_alloc();
            //(tmpObj.native_object as IrisClassBase.IrisClassBasTag).class_object = this
        }

        extern_class.native_class_define(this);

    }

    public reset_all_methods_object(): void {

    }

    public create_new_instance(parameter_list: IrisValue[] | null, context: IrisContextEnvironment | null, thread_info: IrisThreadInfo | null): IrisValue {
        return new IrisValue();
    }

    
}