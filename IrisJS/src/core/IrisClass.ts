import { IrisObject } from './IrisObject'
import { IrisModule } from './IrisModule'
import { IrisInterface } from './IrisInterface'
import { IrisMethod, IrisMethodAuthority, IrisNativeMethodDescriptor } from './IrisMethod'
import { IrisValue } from './IrisValue'
import { IrisContextEnvironment } from './IrisContextEnvironment'
import { IrisThreadInfo } from './IrisThreadInfo'
import { IrisAllocFunc, IrisNativeClassBase } from '../interface/IrisNativeClassBase'
import { IrisDev } from '../util/IrisDevUtil'
import { IrisClassBaseTag } from "../native_classes/IrisClassBase"
import { IrisMethodDefineDescriptor } from "../interface/IrisNativeClassBase"

export class IrisClass {

    public class_name: string = '';
    public super_class: IrisClass | null = null;
    public upper_module: IrisModule | null = null;

    private involved_modules: Set<IrisModule> = new Set<IrisModule>();
    private involved_interfaces: Set<IrisInterface> = new Set<IrisInterface>();
    private instance_methods: Map<string, IrisMethod> = new Map<string, IrisMethod>();
    private constances: Map<string, IrisValue> = new Map<string, IrisValue>();

    private object_alloc_method: IrisAllocFunc | null = null;

    public object: IrisObject | null = null;

    public constructor(extern_class: IrisNativeClassBase) {
        this.object_alloc_method = extern_class.native_alloc;

        let class_obj: IrisClass | null = IrisDev.get_class('Class');

        if (class_obj != null) {
            this.object = class_obj.create_new_instance(null, null, null).object;
            IrisDev.get_native_object_ref<IrisClassBaseTag>(this.object as IrisObject).class_object = this;
        }
        else {
            this.object = new IrisObject();
            let tmp_obj: IrisObject = this.object as IrisObject;
            tmp_obj.class_object = this;
            tmp_obj.native_object = extern_class.native_alloc();
            IrisDev.get_native_object_ref<IrisClassBaseTag>(tmp_obj).class_object = this;
        }

        //extern_class.native_class_define(this);
        let define_descriptors = extern_class.native_class_define();

        for (let descriptor of define_descriptors) {
            this.add_instance_method(descriptor);
        }

    }

    public reset_all_methods_object(): void {
        (this.object as IrisObject).reset_all_methods_objcet();

        for (let [name, method] of this.instance_methods) {
            method.reset_method_object();
        }
    }

    public create_new_instance(parameterList: IrisValue[] | null, context: IrisContextEnvironment | null, threadInfo: IrisThreadInfo | null): IrisValue {
        return new IrisValue();
    }

    public add_instance_method(param: IrisMethodDefineDescriptor): void
    public add_instance_method(param: IrisMethod): void
    public add_instance_method(param: any): any{
        if (param instanceof IrisMethod) {
            this.instance_methods.set(param.name, param);
        }
        // native method define
        else if (param instanceof IrisMethodDefineDescriptor) {
            let descriptor: IrisNativeMethodDescriptor = {
                method_name : param.method_name,
                authority:  param.authority,
                parameter_count : param.parameter_amount,
                is_with_varaible_parameter : param.is_with_variable_parameter,
                native_method_handle : param.native_method
            };
            let method = new IrisMethod(descriptor);
            this.add_instance_method(method);
        }
    }
}
