/**
 * IrisInterpreter class
 * Created by Hui in 2016-12-4
 * Modified by DaraW in 2017-1-14
 */

import { warn } from "./util/index";
import IrisClass from "./core/iris_class"
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
        //let upper_module = module_obj.native_upper_module_define();
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

         let tmpUpperModule = null;
         let tmpValue = null;

         // if without field
         if(name_array.length == 0){
             tmpValue = this.get_constance(class_name);
             // if not found
             if(tmpValue == null) {
                 warn("class " + class_name + " not found.");
                 return null;
             }
             // if this constance is not a class object
             if($dev_util.is_class_object(tmpValue)) {
                 warn("constance " + class_name + " is not a Class object.")
                 return null;
             }
             return $dev_util.get_native_object_ref(tmpValue).class_object;
         }
         // if with field
         else {
             // find upper module
             tmpUpperModule = this.get_module(name_array);
             // if found
             if(tmpUpperModule != null) {
                tmpValue = tmpUpperModule.get_constance(class_name);
                if($dev_util.is_class_object(tmpValue)) {
                    return $dev_util.get_native_object_ref(tmpValue).class_object;
                }
                // if this constance is not a class object
                else {
                    warn("constance " + class_name + " is not a Class object.")
                    return null;
                }
             }
             // if not
             else {
                 warn("field " + full_path + " is not a vaild path.")
                 return null;
             }
         }
    },

    get_module(module_name) {

    },

    get_module_with_name_array(name_array) {

    },

    get_interface(interface_name) {

    },

    add_constance(const_name, value)
    {

    },

    get_constance(const_name) {

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
