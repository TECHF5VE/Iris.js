import { IrisValue } from "../core/IrisValue"
import { IrisMethod } from "../core/IrisMethod"
import { IrisCompiler } from "./IrisCompiler"
import { IrisModule } from "../core/IrisModule"
import { IrisClass } from "../core/IrisClass"
import { IrisDev } from "../util/IrisDevUtil"
import { IrisInterface } from "../core/IrisInterface"
import { IrisNativeClassBase } from "../interface/IrisNativeClassBase"
import { IrisObject } from "../core/IrisObject"

import { IrisClassBase, IrisClassBaseTag } from "../native_classes/IrisClassBase"
import { IrisObjectBase } from "../native_classes/IrisObjectBase"
import { IrisMethodBase } from "../native_classes/IrisMethodBase"

export class IrisInterpreter {

    private constances: Map<string, IrisValue> = new Map<string, IrisValue>();
    private global_values: Map<string, IrisValue> = new Map<string, IrisValue>();

    private main_methods: Map<string, IrisMethod> = new Map<string, IrisMethod>();

    private _nil: IrisValue;
    get nil(): IrisValue {
        return this._nil;
    }

    private _true: IrisValue;
    get true(): IrisValue {
        return this._true;
    }

    private _false: IrisValue;
    get false(): IrisValue {
        return this._false;
    }

    public constructor() {

    }

    public add_main_method(name: string, method: IrisMethod): void {
        this.main_methods.set(name, method);
    }

    public get_main_method(name: string): IrisMethod | null {
        let method = this.main_methods.get(name);
        // do not use undefined, just null
        if (method === undefined) {
            return null;
        }
        else {
            return method;
        } 
    }

    public add_constance(name: string, value: IrisValue): void {
        this.constances.set(name, value);
    }

    public get_constance(name: string) {
        let constance: IrisValue | undefined = this.constances.get(name);
        if (constance == undefined) {
            return null;
        }
        else {
            return constance;
        }
    }

    public add_global_value(name: string, value: IrisValue): void {
        this.global_values.set(name, value);
    }

    public get_global_value(name: string) {
        let value: IrisValue | undefined = this.global_values.get(name);
        if (value == undefined) {
            return null;
        }
        else {
            return value;
        }
    }

    public get_module(full_path: string): IrisModule | null
    public get_module(full_path: string[]): IrisModule | null
    public get_module(full_path: any): any {
        if (typeof full_path == "string") {

        }
        else if (Array.isArray(full_path)) {

        }
    }

    public get_class(full_path: string): IrisClass | null
    public get_class(full_path: string[]): IrisClass | null
    public get_class(full_path: any): any {
        if (typeof full_path == "string") {
            let path_arr: string[] = full_path.split("::");
            return this.get_class(path_arr);
        }
        else if (Array.isArray(full_path)) {
            let class_name: string = full_path.pop() as string;

            let tmp_upper_module: IrisModule | null = null;
            let tmp_value: IrisValue | null = null;

            if (full_path.length == 0) {
                tmp_value = this.get_constance(class_name);
                if (tmp_value == null) {
                    return null;
                }
                if (!IrisDev.check_is_class_object(tmp_value)) {
                    return null;
                }
                return IrisDev.get_native_object_ref<IrisClassBaseTag>(tmp_value).class_object;
            }
            else {
                tmp_upper_module = this.get_module(full_path);

                if (tmp_upper_module != null) {
                    tmp_value = tmp_upper_module.get_constance(class_name);
                    if (tmp_value != null && IrisDev.check_is_class_object(tmp_value)) {
                        return IrisDev.get_native_object_ref<IrisClassBaseTag>(tmp_value).class_object;
                    }
                }
                return null;
            }

        }
    }

    public get_interface(full_path: string): IrisInterface | null
    public get_interface(full_path: string[]): IrisInterface | null
    public get_interface(full_path: any): any {

    }

    public regist_class(class_obj: IrisNativeClassBase): boolean {

        let upper_module: IrisModule | null = class_obj.native_upper_module_define();
        let class_name: string = class_obj.native_class_name_define();

        if (upper_module == null) {
            if (this.get_constance(class_name) != null) {
                return false;
            }
        }
        else if (upper_module.get_constance(class_name) != null) {
            return false;
        }

        let class_intern_obj: IrisClass = new IrisClass(class_obj);
        let class_value: IrisValue = IrisValue.wrap_object(class_intern_obj.object as IrisObject);

        if (upper_module == null) {
            this.add_constance(class_name, class_value);
        }
        else {
            upper_module.add_constance(class_name, class_value);
            upper_module.add_sub_class(class_intern_obj);
        }

        return true;
    }

    //public regist_module()

    public initialize(): boolean {

        this.regist_class(new IrisClassBase());
        this.regist_class(new IrisObjectBase());

        (IrisDev.get_class("Class") as IrisClass).super_class = IrisDev.get_class("Object");

        this.regist_class(new IrisMethodBase());

        (IrisDev.get_class("Class") as IrisClass).reset_all_methods_object();
        (IrisDev.get_class("Object") as IrisClass).reset_all_methods_object();
        (IrisDev.get_class("Method") as IrisClass).reset_all_methods_object();



        return true;
    }

    public shut_down(): boolean {
        return true;
    }

}

export const IrisIntpr: IrisInterpreter = new IrisInterpreter();