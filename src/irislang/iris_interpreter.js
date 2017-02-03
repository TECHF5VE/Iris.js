/**
 * IrisInterpreter class
 * Created by Hui in 2016-12-4
 * Modified by DaraW in 2017-1-14
 */

import { warn } from "./util";
import { IrisClass, IrisModule, IrisValue } from './core';
import {
    IrisClassBase,
    IrisModuleBase,
    IrisInterfaceBase,
    IrisObjectBase,
    IrisMethodBase,
    IrisInteger,
    IrisFloat,
    IrisString,
    IrisUniqueString,
    IrisTrueClass,
    IrisFalseClass,
    IrisNilClass,
    IrisArrayClass,
} from './native_classes';
import { IrisKernel } from "./native_modules/iris_kernel";
import { IrisDev } from "./util";
import {
       root_method_hash_sym,
       root_constance_hash_sym,
       root_global_value_hash_sym,
       true_sym,
       false_sym,
       nil_sym,
      }  from "./util/iris_symbol";

export const IrisInterpreter = {

    constructor() {
        this[root_method_hash_sym] = new Map();
        this[root_constance_hash_sym] = new Map();
        this[root_global_value_hash_sym] = new Map();
    },

    initialize() {
        this.register_class(new IrisClassBase());
        this.register_class(new IrisModuleBase());

        this.register_module(new IrisKernel());

        this.register_class(new IrisObjectBase())

        IrisDev.get_class("Class").super_class = IrisDev.get_class("Object");

        this.register_class(new IrisMethodBase());

        IrisDev.get_class("Class").reset_all_methods_object();
        IrisDev.get_class("Object").reset_all_methods_object();
        IrisDev.get_class("Method").reset_all_methods_object();

        this.register_class(new IrisInteger());
        this.register_class(new IrisFloat());
        this.register_class(new IrisString());
        this.register_class(new IrisUniqueString());

        this.register_class(new IrisTrueClass());
        this.register_class(new IrisFalseClass());
        this.register_class(new IrisNilClass());

        this.register_class(new IrisArrayClass());

        this[true_sym] = IrisDev.get_class("TrueClass").create_new_instance(null, null, null);
        this[false_sym] = IrisDev.get_class("FalseClass").create_new_instance(null, null, null);
        this[nil_sym] = IrisDev.get_class("NilClass").create_new_instance(null, null, null);

        return true;
    },

    shut_down() {

    },

    run() {

    },

    register_class(class_obj) {
        let upper_module = class_obj.upper_module;
        let class_name = class_obj.class_name;

        if(upper_module == null){
            if(this.get_constance(class_name)) {
                return false;
            }
        } else {
            if(upper_module.get_constance(class_name) != null) {
                return false;
            }
        }

        let class_intern_obj = new IrisClass(
            class_obj.native_class_name_define(),
            class_obj.native_super_class_define(),
            class_obj.native_super_module_define(),
            class_obj.native_class_define,
            class_obj.native_alloc
        );
        let obj_value = IrisValue.wrap_object(class_intern_obj.object);

        if(upper_module == null){
            this.add_constance(class_name, obj_value);
        } else {
            upper_module.add_constance(class_name, obj_value);
            upper_module.add_sub_class(class_intern_obj);
        }

        return true;
    },

    register_module(module_obj) {
        let upper_module = module_obj.native_upper_module_define();
        let module_name = module_obj.native_module_name_define();

        if(upper_module == null) {
            if(this.get_constance(module_name) != null) {
                warn("constance " + module_name + " already exists.")
                return false;
            }
        } else {
            if(upper_module.get_constance(module_name) != null) {
                warn("constance " + module_name + " already exists.")
            }
        }

        let module_intern_obj = new IrisModule();
        let module_value = IrisValue.wrap_object(module_intern_obj.object);

        if(upper_module == null) {
            this.add_constance(module_name, module_value);
        } else {
            upper_module.add_constance(module_name, module_value);
        }
    },

    register_interface(interface_obj) {

    },

    /**
     * class_name : maybe a raw String such as "A::B::C" or an array such as ["A", "B", "C"]
     */
    get_class(class_name) {
        // split the name
        let name_array = class_name.split("::");
        return this.get_class_with_name_array(name_array, class_name);
    },

    get_class_with_name_array(name_array, full_path = "") {
         let class_name = name_array.pop();

         let tmp_upper_module = null;
         let tmp_value = null;

         // if without field
         if(name_array.length == 0){
             tmp_value = this.get_constance(class_name);
             // if not found
             if(tmp_value == null) {
                 warn("class " + class_name + " not found.");
                 return null;
             }
             // if this constance is not a class object
             if(IrisDev.is_class_object(tmp_value)) {
                 warn("constance " + class_name + " is not a Class object.")
                 return null;
             }
             return IrisDev.get_native_object_ref(tmp_value).class_object;
         }
         // if with field
         else {
             // find upper module
             tmp_upper_module = this.get_module_with_name_array(name_array);
             // if found
             if(tmp_upper_module != null) {
                tmp_value = tmp_upper_module.get_constance(class_name);
                if(IrisDev.is_class_object(tmp_value)) {
                    return IrisDev.get_native_object_ref(tmp_value).class_object;
                }
                // if this constance is not a class object
                else {
                    warn("constance " + class_name + " is not a Class object.")
                    return null;
                }
             }
             // if not
             else {
                 warn("field " + full_path + " is not a valid path.")
                 return null;
             }
         }
    },

    get_module(module_name) {
        let name_array = module_name.split("::");
        return this.get_module_with_name_array(name_array, module_name);
    },

    get_module_with_name_array(name_array, full_path="") {
        if(name_array.length == 0) {
            warn("Empty path!");
            return null;
        }
        let tmp_cur = null;
        let tmp_value = null;
        let first_module_name = name_array.pop();

        tmp_value = this.get_constance(first_module_name);
        if(tmp_value != null) {
            if(IrisDev.is_module_object()) {
                tmp_cur = IrisDev.get_native_object_ref(tmp_value).module;
            } else {
                warn("Constance " + first_module_name + " is not a module object");
                return null;
            }
        }
        else {
            warn("field " + full_path + " is not a valid path.");
            return null;
        }

        for(let module_name of name_array) {
            tmp_value = tmp_cur.get_constance(module_name);
            if(IrisDev.is_module_object(tmp_value)) {
                tmp_cur = IrisDev.get_native_object_ref(tmp_value).module;
            } else {
                warn("Constance " + module_name + " is not a module object");
                break;
            }
        }

        return tmp_cur;
    },

    get_interface(interface_name) {

    },

    add_constance(name, value) {
        this[root_constance_hash_sym][name] = value;
    },

    get_constance(name) {
        return this[root_constance_hash_sym][name];
    },

    add_global_value(name, value) {
        this[root_global_value_hash_sym][name] = value;
    },

    get_global_value(name) {
        return this[root_global_value_hash_sym][name];
    },

    get true() {
        return this[true_sym];
    },

    get false() {
        return this[false_sym];
    },

    get nil() {
        return this[nil_sym];
    },
}
