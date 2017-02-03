import { IrisDev } from '../util';
import { IrisMethod } from "../core";
import {
        name_sym
    } from "../util/iris_symbol";

export class IrisNilClass {

    native_class_name_define() {
        return "NilClass";
    }

    native_super_class_define() {
        return null;
    }

    native_super_module_define() {
        return null;
    }

    native_alloc() {
        return new IrisNilClassTag();
    }

    native_class_define(class_obj) {
        class_obj.add_instance_method(IrisNilClass, "LogicNot", "!", 0, false, IrisMethod.MethodAuthority.Everyone);
    }

    static logic_not(self, parameter_list, variable_parameter_list, context, thread_info) {
        return IrisDev.true;
    }

    static get_name(self, parameter_list, variable_parameter_list, context, thread_info) {
        return IrisDev.create_string(IrisDev.get_native_object_ref(self).name);
    }

    static get IrisNilClassTag() {
        return IrisNilClassTag;
    }

}

class IrisNilClassTag {
    constructor() {
        this[name_sym] = "nil";
    }

    logic_not() {
        return true;
    }

    get name() {
        return this[name_sym];
    }
}
