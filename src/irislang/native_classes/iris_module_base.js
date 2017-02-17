import { warn, log } from '../util/iris_debug';
import { IrisDev } from "../util/iris_dev";
import { IrisMethod } from "../core";
import {
    module_sym
    } from "../util/iris_symbol";

export class IrisModuleBase {

    native_class_name_define() {
        return "Module";
    }

    native_super_class_define() {
        return null;
    }

    native_upper_module_define() {
        return null;
    }

    native_alloc() {
        return new IrisModuleBaseTag();
    }

    native_class_define(class_obj) {

    }

    static get_module_name(self, parameter_list, variable_parameter_list, context, thread_info) {
        return IrisDev.create_string(IrisDev.get_native_object_ref(self).module_name);
    }

    static get IrisModuleBaseTag() {
        return IrisModuleBaseTag;
    }

}

class IrisModuleBaseTag {
    constructor(module) {
        this[module_sym] = module;
    }

    get module_name() {
        return this[module_sym].module_name;
    }

    get module() {
        return this[module_sym];
    }

    set module(module) {
        this[module_sym] = module;
    }
}
