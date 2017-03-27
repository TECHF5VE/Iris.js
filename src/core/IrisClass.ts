import { IrisObject } from './IrisObject'
import { IrisModule } from './IrisModule'
import { IrisInterface } from './IrisInterface'
import { IrisMethod, IrisMethodAuthority, IrisNativeMethodDescriptor, IrisCallSide } from './IrisMethod'
import { IrisValue } from './IrisValue'
import { IrisContextEnvironment } from './IrisContextEnvironment'
import { IrisThreadInfo } from './IrisThreadInfo'
import { IrisAllocFunc, IrisNativeClassBase } from '../interface/IrisNativeClassBase'
import { IrisDev } from '../util/IrisDevUtil'
import { IrisClassBaseTag } from "../native_classes/IrisClassBase"
import { IrisMethodDefineDescriptor } from "../interface/IrisNativeClassBase"
import { IrisIntpr } from "../util/IrisInterpreter"

export class IrisClass {

    public name: string = '';
    public super_class: IrisClass | undefined = undefined;
    public upper_module: IrisModule | undefined = undefined;

    private involved_modules: Set<IrisModule> = new Set<IrisModule>();
    private involved_interfaces: Set<IrisInterface> = new Set<IrisInterface>();
    private instance_methods: Map<string, IrisMethod> = new Map<string, IrisMethod>();
    private constances: Map<string, IrisValue> = new Map<string, IrisValue>();

    private object_alloc_method: IrisAllocFunc | undefined = undefined;

    public object: IrisObject | undefined = undefined;

    public constructor(extern_class: IrisNativeClassBase) {
        this.name = extern_class.native_class_name_define();
        this.super_class = extern_class.native_super_class_define();
        this.upper_module = extern_class.native_upper_module_define();

        this.object_alloc_method = extern_class.native_alloc;

        let class_obj: IrisClass | undefined = IrisDev.class_native_object;

        if (class_obj != undefined) {
            this.object = class_obj.create_new_instance(undefined, undefined, undefined).object;
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
        let define_descriptors: IrisMethodDefineDescriptor[] = extern_class.native_class_define();

        for (let descriptor of define_descriptors) {
            Object.setPrototypeOf(descriptor, IrisMethodDefineDescriptor.prototype);
            this.add_instance_method(descriptor);
        }

    }

    public reset_all_methods_object(): void {
        (this.object as IrisObject).reset_all_methods_objcet();

        for (let [name, method] of this.instance_methods) {
            method.reset_method_object();
        }
    }

    public create_new_instance(parameter_list: IrisValue[] | undefined, context: IrisContextEnvironment | undefined, threadInfo: IrisThreadInfo | undefined): IrisValue {
        let object: IrisObject = new IrisObject();
        object.class_object = this;
        let native_obj: Object = (this.object_alloc_method as IrisAllocFunc)();
        object.native_object = native_obj;

        if(IrisIntpr.method_class_generated) {
            object.call_instance_method("__format", parameter_list == undefined ? [] : parameter_list, context, threadInfo, IrisCallSide.OutSide);
        }
        
        return IrisValue.wrap_object(object);
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
                native_method_handle: param.native_method,
            };
            Object.setPrototypeOf(descriptor, IrisNativeMethodDescriptor.prototype);

            let method = new IrisMethod(descriptor);
            this.add_instance_method(method);
        }
    }

    private inner_search_class_module_method(class_obj: IrisClass, method_name: string) : IrisMethod | undefined {
        return undefined;
    }

    private inner_get_method(class_obj: IrisClass, method_name: string): IrisMethod | undefined {
        let method: IrisMethod | undefined = class_obj.instance_methods.get(method_name);

        if (method == undefined) {
            method = this.inner_search_class_module_method(class_obj, method_name);
        }
        return method;
    }

    public get_method(method_name: string, result: { method: IrisMethod | undefined; is_current_class_method: boolean }) {

        result.is_current_class_method = false;
        result.method = undefined;

        let method: IrisMethod | undefined = this.inner_get_method(this, method_name);

        if (method != undefined) {
            result.is_current_class_method = true;
            result.method = method;
            return;
        }

        let cur_class: IrisClass | undefined = this.super_class;

        while (cur_class != undefined) {
            method = this.inner_get_method(cur_class, method_name);
            if (method != undefined) {
                result.is_current_class_method = false;
                result.method = method;
                return;
            }
            cur_class = cur_class.super_class;
        }

    }
}
