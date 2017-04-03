import { IrisValue } from '../core/IrisValue';
import { IrisMethod } from '../core/IrisMethod';
import { IrisCompiler } from './IrisCompiler';
import { IrisModule } from '../core/IrisModule';
import { IrisClass } from '../core/IrisClass';
import { IrisDev } from '../util/IrisDevUtil';
import { IrisInterface } from '../core/IrisInterface';
import { IrisNativeClassBase } from '../interface/IrisNativeClassBase';
import { IrisObject } from '../core/IrisObject';
import { IrisClassBase, IrisClassBaseTag } from '../native_classes/IrisClassBase';
import { IrisObjectBase } from '../native_classes/IrisObjectBase';
import { IrisMethodBase } from '../native_classes/IrisMethodBase';
import { IrisNilClass } from '../native_classes/IrisNilClass';
import { IrisTrueClass } from '../native_classes/IrisTrueClass';
import { IrisFalseClass } from '../native_classes/IrisFalseClass';
import { IrisIntegerClass } from '../native_classes/IrisInteger';
import { IrisFloatClass} from '../native_classes/IrisFloat';

export class IrisInterpreter {

    public method_class_generated: boolean = false;

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

    public constructor () {

    }

    public add_main_method(name: string, method: IrisMethod): void {
        this.main_methods.set(name, method);
    }

    public get_main_method(name: string): IrisMethod | undefined {
        let method = this.main_methods.get(name);
        // do not use undefined, just undefined
        if (method === undefined) {
            return undefined;
        } else {
            return method;
        }
    }

    public add_constance(name: string, value: IrisValue): void {
        this.constances.set(name, value);
    }

    public get_constance (name: string) {
        let constance: IrisValue | undefined = this.constances.get(name);
        if (constance === undefined) {
            return undefined;
        } else {
            return constance;
        }
    }

    public add_global_value (name: string, value: IrisValue): void {
        this.global_values.set(name, value);
    }

    public get_global_value (name: string) {
        let value: IrisValue | undefined = this.global_values.get(name);
        if (value === undefined) {
            return undefined;
        } else {
            return value;
        }
    }

    public get_module (full_path: string): IrisModule | undefined
    public get_module (full_path: string[]): IrisModule | undefined
    public get_module (full_path: any): any {
        if (typeof full_path === 'string') {

        } else if (Array.isArray(full_path)) {

        }
    }

    public get_class (full_path: string): IrisClass | undefined
    public get_class (full_path: string[]): IrisClass | undefined
    public get_class (full_path: any): any {
        if (typeof full_path === 'string') {
            let path_arr: string[] = full_path.split('::');
            return this.get_class(path_arr);
        } else if (Array.isArray(full_path)) {
            let class_name: string = full_path.pop() as string;

            let tmp_upper_module: IrisModule | undefined = undefined;
            let tmp_value: IrisValue | undefined = undefined;

            if (full_path.length === 0) {
                tmp_value = this.get_constance(class_name);
                if (tmp_value === undefined) {
                    return undefined;
                }
                if (!IrisDev.check_is_class_object(tmp_value)) {
                    return undefined;
                }
                return IrisDev.get_native_object_ref<IrisClassBaseTag>(tmp_value).class_object;
            } else {
                tmp_upper_module = this.get_module(full_path);

                if (tmp_upper_module !== undefined) {
                    tmp_value = tmp_upper_module.get_constance(class_name);
                    if (tmp_value !== undefined && IrisDev.check_is_class_object(tmp_value)) {
                        return IrisDev.get_native_object_ref<IrisClassBaseTag>(tmp_value).class_object;
                    }
                }
                return undefined;
            }

        }
    }

    public get_interface (full_path: string): IrisInterface | undefined
    public get_interface (full_path: string[]): IrisInterface | undefined
    public get_interface (full_path: any): any {

    }

    public regist_class (class_obj: IrisNativeClassBase): boolean {

        let upper_module: IrisModule | undefined = class_obj. native_upper_module_define();
        let class_name: string = class_obj.native_class_name_define();

        if (upper_module === undefined) {
            if (this.get_constance(class_name) !== undefined) {
                return false;
            }
        } else if (upper_module.get_constance(class_name) !== undefined) {
            return false;
        }

        let class_intern_obj: IrisClass = new IrisClass(class_obj);
        let class_value: IrisValue = IrisValue.wrap_object(class_intern_obj.object as IrisObject);

        if (upper_module == undefined) {
            this.add_constance(class_name, class_value);
        } else {
            upper_module.add_constance(class_name, class_value);
            upper_module.add_sub_class(class_intern_obj);
        }

        return true;
    }

    //public regist_module()

    public initialize (): boolean {

        this.method_class_generated = false;

        this.regist_class(new IrisClassBase());
        IrisDev.class_native_object = IrisDev.get_native_object_ref<IrisClassBaseTag>((this.constances.get('Class') as IrisValue).object as IrisObject).class_object as IrisClass;

        this.regist_class(new IrisObjectBase());

        let a = IrisDev.get_class('Object');
        (IrisDev.get_class('Class') as IrisClass).super_class = IrisDev.get_class('Object');

        this.regist_class(new IrisMethodBase());

        this.method_class_generated = true;

        (IrisDev.get_class('Class') as IrisClass).reset_all_methods_object();
        (IrisDev.get_class('Object') as IrisClass).reset_all_methods_object();
        (IrisDev.get_class('Method') as IrisClass).reset_all_methods_object();

        this.regist_class(new IrisIntegerClass());
        IrisDev.integer_native_object = IrisDev.get_native_object_ref<IrisClassBaseTag>((this.constances.get('Integer') as IrisValue).object as IrisObject).class_object as IrisClass;

        this.regist_class(new IrisFloatClass());
        IrisDev.float_native_object = IrisDev.get_native_object_ref<IrisClassBaseTag>((this.constances.get('Float') as IrisValue).object as IrisObject).class_object as IrisClass;

        this.regist_class(new IrisTrueClass());
        this.regist_class(new IrisFalseClass());
        this.regist_class(new IrisNilClass());

        this._true = (IrisDev.get_class('TrueClass') as IrisClass).create_new_instance(undefined, undefined, undefined);
        this._false = (IrisDev.get_class('FalseClass') as IrisClass).create_new_instance(undefined, undefined, undefined);
        this._nil = (IrisDev.get_class('NilClass') as IrisClass).create_new_instance(undefined, undefined, undefined);

        return true;
    }

    public shut_down (): boolean {
        return true;
    }

}

const IrisIntpr: IrisInterpreter = new IrisInterpreter();
export { IrisIntpr };
