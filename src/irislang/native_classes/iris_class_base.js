import { IrisMethod } from '../core/iris_method';
import { warn, log } from '../util/iris_debug';
import { IrisDev } from "../util/iris_dev";
import {
        class_obj_sym
    } from "../util/iris_symbol";

export class IrisClassBase {

    native_class_name_define() {
        return "Class";
    }

    native_super_class_define() {
        return null;
    }

    native_super_module_define() {
        return null;
    }

    native_alloc() {
        return new IrisClassBaseTag();
    }

    native_class_define(class_obj) {
        class_obj.add_instance_method(IrisClassBase, "New", "new", 0, true, IrisMethod.MethodAuthority.Everyone);
    }

    static new(self, parameter_list, variable_parameter_list, context, thread_info) {
        let class_obj = IrisDev.get_native_object_ref(self);
        let result = IrisDev.nil;
        result = class_obj.class_obj.create_new_instance(variable_parameter_list, context, thread_info);
        return result;
    }

    static get_class_name(self, parameter_list, variable_parameter_list, context, thread_info) {
        return IrisDev.create_string(class_obj.class_name);
    }

    static get IrisClassBaseTag() {
        return IrisClassBaseTag;
    }
}

class IrisClassBaseTag {
    constructor() {
        this[class_obj_sym] = null;
    }

    get class_object() {
        return this[class_obj_sym];
    }

    set class_object(class_obj) {
        this[class_obj_sym] = class_obj;
    }

    get class_name() {
        return this[class_obj_sym].class_name;
    }
}
