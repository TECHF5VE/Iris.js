/**
 * IrisInterpreter class
 * Created by Hui in 2016-12-4
 * Modified by DaraW in 2017-1-14
 */

import { warn } from "./util/index";
import IrisClass from "./core/iris_class"
import IrisModule from "./core/iris_module"
import IrisValue from "./core/iris_value"

import IrisClassBase from "./native_classes/iris_class_base"
import IrisModuleBase from "./native_classes/iris_module_base"
import IrisInterfaceBase from "./native_classes/iris_interface_base"
import IrisObjectBase from "./native_classes/iris_object_base"
import IrisMethodBase from "./native_classes/iris_method_base"

import IrisInteger from "./native_classes/iris_integer"
import IrisFloat from "./native_classes/iris_float"
import IrisString from "./native_classes/iris_string"
import IrisUniqueString from "./native_classes/iris_unique_string"

import IrisTrueClass from "./native_classes/iris_true_class"
import IrisFalseClass from "./native_classes/iris_false_class"
import IrisNilClass from "./native_classes/iris_nil_class"

import IrisArrayClass from "./native_classes/iris_array"

import IrisKernel from "./native_modules/iris_kernel"

import $dev_util from "./util/iris_dev"

import {
       root_method_hash_sym,
       root_constance_hash_sym,
       root_global_value_hash_sym,
       true_sym,
       false_sym,
       nil_sym,
      }  from "./util/iris_symbol";

export default {

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

        $dev_util.get_class("Class").super_class = $dev_util.get_class("Object");

        this.register_class(new IrisMethodBase());

        $dev_util.get_class("Class").reset_all_methods_object();
        $dev_util.get_class("Object").reset_all_methods_object();
        $dev_util.get_class("Method").reset_all_methods_object();

        this.register_class(new IrisInteger());
        this.register_class(new IrisFloat());
        this.register_class(new IrisString());
        this.register_class(new IrisUniqueString());

        this.register_class(new IrisTrueClass());
        this.register_class(new IrisFalseClass());
        this.register_class(new IrisNilClass());

        this.register_class(new IrisArrayClass());

        this[true_sym] = $dev_util.get_class("TrueClass").create_new_instance(null, null, null);
        this[false_sym] = $dev_util.get_class("FalseClass").create_new_instance(null, null, null);
        this[nil_sym] = $dev_util.get_class("NilClass").create_new_instance(null, null, null);

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
             if($dev_util.is_class_object(tmp_value)) {
                 warn("constance " + class_name + " is not a Class object.")
                 return null;
             }
             return $dev_util.get_native_object_ref(tmp_value).class_object;
         }
         // if with field
         else {
             // find upper module
             tmp_upper_module = this.get_module_with_name_array(name_array);
             // if found
             if(tmp_upper_module != null) {
                tmp_value = tmp_upper_module.get_constance(class_name);
                if($dev_util.is_class_object(tmp_value)) {
                    return $dev_util.get_native_object_ref(tmp_value).class_object;
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
            if($dev_util.is_module_object()) {
                tmp_cur = $dev_util.get_native_object_ref(tmp_value).module;
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
            if($dev_util.is_module_object(tmp_value)) {
                tmp_cur = $dev_util.get_native_object_ref(tmp_value).module;
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
