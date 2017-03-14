import { IrisModule } from "./IrisModule"
import { IrisInterface } from "./IrisInterface"
import { IrisMethod, IrisNativeMethod } from "./IrisMethod"
import { IrisValue } from "./IrisValue"
import { IrisContextEnvironment } from "./IrisContextEnvironment"
import { IrisThreadInfo } from "./IrisThreadInfo"
import { IrisAllocFunc, IrisNativeClassBase } from "../interface/IrisNativeClassBase"

export class IrisClass {

    private class_name: string = "";
    private super_class: IrisClass | null = null;
    private upper_module: IrisModule | null = null;

    private involved_modules: Set<IrisModule> = new Set<IrisModule>();
    private involved_interfaces: Set<IrisInterface> = new Set<IrisInterface>();
    private instance_method: Map<string, IrisMethod> = new Map<string, IrisMethod>();
    private constances: Map<string, IrisValue> = new Map<string, IrisValue>();

    private object_alloc_method: IrisAllocFunc | null = null;

    public constructor(extern_class: IrisNativeClassBase) {
        this.object_alloc_method = extern_class.native_alloc;
    }

    public reset_all_methods_object(): void {

    }
}