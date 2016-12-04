/**
 * This file is part of IrisJS.
 * Created by Chi on 10/11/2016.
 * Modified by Hui on 2016-11-29
 */

import IrisObject from "./iris_object";
import IrisMethod from "./iris_method";

const class_name_sym = Symbol("class_name");
const super_class_sym = Symbol("super_class");
const upper_module_sym = Symbol("upper_module");
const object_sym = Symbol("object");
const instance_methods_sym = Symbol("instance_methods");
const constances_sym  = Symbol("constances");
const class_variables_sym = Symbol("class_variables");
const method_name_sym = Symbol("method_name");

export default class IrisClass {
     constructor({ class_name, super_class, upper_module, class_define_method, obj_alloc_method }) {
         this[class_name_sym] = class_name;
         this[super_class_sym] = super_class;
         this[upper_module_sym] = upper_module;
         
         this[object_sym] = new IrisObject();
         this[object_sym].class = this; 
         this[object_sym].native_object = obj_alloc_method(); 

         class_define_method(this);
     }

     get_method(method_name) {
         
     }

     /**
      * native_method : { method_name, parameter_count, is_with_variable_parameter, authority, native_func }
      * user_method : { method_name, authority, user_method }
      */
     add_instance_method(regist_obj) {
         if(regist_obj instanceof IrisMethod) {
            this[instance_methods_sym][regist_obj.method_name] = regist_obj;
         } else {
            this[instance_methods_sym][regist_obj.method_name] = new IrisMethod(regist_obj);
         }
     }

     /**
      * native_method : { method_name, parameter_count, is_with_variable_parameter, authority, native_func }
      * user_method : { method_name, authority, user_method }
      */
     add_class_method(regist_obj) {
         if(regist_obj instanceof IrisMethod) {
            this[object_sym].add_instance_method(regist_obj);
         } else {
            this[object_sym].add_instance_method(new IrisMethod(regist_obj));
         }
     }

     add_constance(constance_name, value) {
         this[constances_sym][constance_name] = value;
     }

     get_constance(constance_name) {
         
     }

     add_class_variable(class_variable_name, value) {
         this[class_variables_sym][class_variable_name] = value; 
     }

     get_class_variable(class_variable_name) {
         this[class_variable_name];
     }

     get method_name() {
         return this[method_name_sym];
     }

     get super_class() {
         return this[super_class_sym];
     }

     get upper_module() {
         return this[upper_module_sym]
     }
     
}