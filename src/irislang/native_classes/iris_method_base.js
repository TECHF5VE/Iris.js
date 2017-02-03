import { IrisDev } from '../util';
import { IrisMethod } from "../core";
import {
    method_object_sym
    } from "../util/iris_symbol";

export class IrisMethodBase {

    native_class_name_define() {
        return "Method";
    }

    native_super_class_define() {
        return IrisDev.get_class("Object");
    }

    native_super_module_define() {
        return null;
    }

    native_alloc() {
        return new IrisMethodBaseTag();
    }

    native_class_define(class_obj) {

    }

    static get_name(self, parameter_list, variable_parameter_list, context, thread_info) {
        return IrisDev.create_string(IrisDev.get_native_object_ref(self).method_name);
    }

    static get IrisMethodBaseTag() {
        return IrisMethodBaseTag;
    }

}

class IrisMethodBaseTag {
    constructor() {
        this[method_object_sym] = null;
    }

    get method_name() {
        return this[method_object_sym].method_name;
    }

    get object() {
        return this[method_object_sym];
    }

    set object(method_obj) {
        this[method_object_sym] = method_obj;
    }
}
