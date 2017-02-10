/**
 * IrisModule class
 * Created by DaraW on 2017-1-15
 */

import { IrisMethod } from "./iris_method";

import { 
        module_name_sym,
        module_object_sym,
        upper_module_sym,
        sub_classes_sym,
        sub_modules_sym,
        involved_modules_sym,
        constance_sym,
        class_variables_sym,
        instance_methods_sym
    } from "../util/iris_symbol";

export class IrisModule {
    constructor(upper_module) {
        // not sure to work
        console.log(1, upper_module);
        this[module_name_sym] = upper_module.native_module_name_define();
        this[module_object_sym] = null;
        this[upper_module_sym] = null;
        this[sub_classes_sym] = new Set();
        this[sub_modules_sym] = new Set();
        this[involved_modules_sym] = new Set();
        this[constance_sym] = new Map();
        this[class_variables_sym] = new Map();
        this[instance_methods_sym] = new Map();
    }

    add_sub_class(sub_class) {
        this[sub_classes_sym].add(sub_class);
    }

    add_sub_module(sub_module) {
        this[sub_modules_sym].add(sub_module);
    }

    get_method(method_name) {
        return this._search_method(this, method_name);
    }

    _search_method(cur_module, method_name) {
        let method = cur_module[instance_methods_sym].get(method_name);
        if (method !== null) {
            return method;
        }

        for (let module of this[involved_modules_sym].entries()) {
             method = this._search_method(module, method_name);
             if (method !== null) {
                 return method;
             }
        }

        return null;
    }

    add_constance(name, value) {
        this[constance_sym].set(name, value);
    }

    get_constance(name) {
        return this[constance_sym].get(name);
    }

    search_constance(name) {
        return this._search_constance(this, name);
    }

    _search_constance(cur_module, name) {
        let result = cur_module.get_constance(name);
        if (result !== null) {
            return result;
        }

        for (let module of this[involved_modules_sym].entries()) {
             result = this._search_method(module, name);
             if (result !== null) {
                 return result;
             }
        }

        return null;
    }

    get_class_variable(name) {
        return this[class_variables_sym].get(name);
    }

    search_class_variable(name) {
        return this._search_class_variable(this, name);
    }

    _search_class_variable(cur_module, name) {
        let result = cur_module.get_class_variable(name);
        if (result !== null) {
            return result;
        }

        for (let module of this[involved_modules_sym].entries()) {
             result = this._search_class_variable(module, name);
             if (result !== null) {
                 return result;
             }
        }

        return null;
    }

    add_class_method(native_class, native_name, method_name, parameter_amount, is_with_variable_parameter, authority) {
        // let method = new IrisMethod(method_name, parameter_amount, is_with_variable_parameter, authority, );
        // this.add_class_method(method);
    }

    add_instance_method(native_class, native_name, method_name, parameter_amount, is_with_variable_parameter, authority) {
        // let method = new IrisMethod(method_name, parameter_amount, is_with_variable_parameter, authority, );
        // this.add_instance_method(method);
    }

    add_class_method(method) {
        this[module_object_sym].add_instance_method(method);
    }

    add_instance_method(method) {
        this[instance_methods_sym].set(method.method_name, method);
    }

    add_class_variable(name, value) {
        this[class_variables_sym].set(name, value);
    }

    get object() {
        return this[module_name_sym];
    }

    set object(module_object) {
        this[module_name_sym] = module_object;
    }

    get upper_module() {
        return this[upper_module_sym];
    }

    set upper_module(upper_module) {
        this[upper_module_sym] = upper_module;
    }

    get module_name() {
        return this[module_name_sym];
    }

    set module_name(module_name) {
        this[module_name_sym] = module_name;
    }

}