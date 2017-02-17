/**
 * This file is part of IrisJS.
 * Created by Chi on 10/11/2016.
 * Modified by Hui on 2016-11-29
 * Modified by DaraW on 2016-12-26
 */
import { IrisObject } from "./iris_object";
import { IrisMethod, inline_NativeMethod, inline_UserMethod } from "./iris_method";
import { IrisValue } from "./iris_value";
import { IrisDev } from "../util/iris_dev";
import { warn } from '../util/iris_debug';
import { iris_sym } from '../util/iris_symbol';

// Priate Symbols
const class_name_sym = Symbol("class_name");
const super_class_sym = Symbol("super_class");
const upper_module_sym = Symbol("upper_module");
const object_sym = Symbol("object");
const instance_methods_sym = Symbol("instance_methods");
const constances_sym  = Symbol("constances");
const class_variables_sym = Symbol("class_variables");
const method_name_sym = Symbol("method_name");
const method_sym = Symbol("method");
const is_current_class_method_sym = Symbol("is_current_class_method");
const involved_modules_sym = Symbol("involved_modules");
const involved_interfaces_sym = Symbol("involved_interfaces");
const object_alloc_method_sym = Symbol("object_alloc_method");

export class IrisClass {
     constructor(extern_class) {
         const native_class_define = extern_class.native_class_define;
         // FIXME: not sure to work !!!
         this[class_name_sym] = extern_class.native_class_name_define();
         this[super_class_sym] = extern_class.native_super_class_define();
         this[upper_module_sym] = extern_class.native_upper_module_define();

         this[involved_modules_sym] = new Set();
         this[involved_interfaces_sym] = new Set();
         this[instance_methods_sym] = new Map();
         this[constances_sym] = new Map();

         this[object_alloc_method_sym] = extern_class.native_alloc;

         let class_obj = IrisDev.get_class("Class");

         if (class_obj !== null) {
            this[object_sym] = class_obj.create_new_instance(null, null, null).object;
            this[object_sym].native_object.class_object = this;
         } else {
            this[object_sym] = new IrisObject();
            this[object_sym].class = this;
            console.log(extern_class.native_alloc())
             this[object_sym].native_object = extern_class.native_alloc();
            this[object_sym].native_object.class_object = this;
         }

         if (typeof extern_class.native_class_define === 'function') {
             extern_class.native_class_define(this);
         } else {
            warn(`class_define_method ${extern_class.native_class_define} is not a function`);
         }
     }

     reset_all_methods_object() {
         this[object_sym].reset_all_methods_object();

         for (let [method_name, method] of this[instance_methods_sym].entries()) {
             method.reset_method_object();
         }

     }

     get_method(method_name, result) {
         let method = null;
         result.current_class_method = false;
         result.method = null;

         method = this._get_method(this, method_name);

         // found
         if (method !== null) {
             result.current_class_method = true;
             result.method = method;
             return;
         }

         let cur_class = this[super_class_sym];

         while(cur_class !== null) {
             method = this._get_method(cur_class, method_name);
             if (method !== null) {
                 result.current_class_method = false;
                 result.method = method;
                 return;
             }
             cur_class = cur_class.super_class;
         }
     }

     create_new_instance(parameter_list, context, thread_info) {
         let object = new IrisObject();
         object.class = this;
         let native_obj = this[object_alloc_method_sym]();
         object.native_object = native_obj;
         object.call_instance_method("__format", parameter_list, context, thread_info, IrisMethod.CallSide.OutSide);
         return IrisValue.wrap_object(object);
     }

     /**
      * native_method : { method_name, parameter_count, is_with_variable_parameter, authority, native_func }
      * user_method : { method_name, authority, user_method }
      */
     add_instance_method(...args) {
         if (args.length === 6) {
             // native method
             this[instance_methods_sym][args[0]] = new IrisMethod(new inline_NativeMethod(...args));
         } else {
             // user method
             const [method_name, authority, user_method] = args;
             // FIXME: the number of arguments is not correct!
             this[instance_methods_sym][args[0]] = new IrisMethod(new inline_UserMethod(...args));
         }
     }

     /**
      * native_method : { method_name, parameter_count, is_with_variable_parameter, authority, native_func }
      * user_method : { method_name, authority, user_method }
      */
     add_class_method(regist_obj) {
         if (regist_obj instanceof IrisMethod) {
            this[object_sym].add_instance_method(regist_obj);
         } else {
            this[object_sym].add_instance_method(new IrisMethod(regist_obj));
         }
     }

     add_involved_module(module_obj) {
         this[involved_modules_sym].add(module_obj);
     }

     add_involved_interface(interface_obj) {
         this[involved_interfaces_sym].add(interface_obj);
     }

     add_constance(constance_name, value) {
         this[constances_sym].set(constance_name, value);
     }

     get_constance(constance_name) {
         return this[constances_sym].get(constance_name);
     }

     search_constance(constance_name) {
         // current class, involved module, super class
         let cur_class = this;
         let result = null;

         while(cur_class !== null) {
             result = this._get_constance(cur_class, constance_name);
             if (result !== null) {
                 break;
             }
             cur_class = cur_class.super_class;
         }
         return result;
     }

     add_class_variable(class_variable_name, value) {
         this[class_variables_sym].set(class_variable_name, value);
     }

     get_class_variable(class_variable_name) {
         return this[class_variables_sym].get(class_variable_name);
     }

     search_class_variable(constance_name) {
         let cur_class = this;
         let result = null;

         while(cur_class !== null) {
             result = this._get_class_variable(cur_class, constance_name);
             if (result !== null) {
                 break;
             }
             cur_class = cur_class.super_class;
         }
         return result;
     }

     _get_method(search_class, method_name) {
         let method = null;
         method = search_class[instance_methods_sym].get(method_name);
         if (method === null) {
             method = this._search_class_module_method(search_class, method_name);
         }

         return method;
     }

     _get_constance(cur_class, name) {
         let result = cur_class.get_constance(name);
         if (result === null) {
             result = this._search_class_module_constance(cur_class, name);
         }

         return result;
     }

     _get_class_variable(cur_class, name) {
         let result = cur_class.get_class_variable(name);
         if (result === null) {
             result = this._search_class_module_class_variable(cur_class, name);
         }

         return result;
     }

     _search_class_module_method(cur_class, name) {
         let method = null;
         for (let module of cur_class[involved_modules_sym].entries()) {
             method = module.get_method(name);
             if (method !== null) {
                 break;
             }
         }

         return method;
     }

     _search_class_module_constance(cur_class, name) {
         let result = null;
         for (let module of cur_class[involved_modules_sym].entries()) {
             result = module.search_constance(name);
             if (result !== null) {
                 break;
             }
         }

         return result;
     }

     _search_class_module_class_variable(cur_class, name) {
         let result = null;
         for (let module of cur_class[involved_modules_sym].entries()) {
             result = module.search_class_variable(name);
             if (result !== null) {
                 break;
             }
         }

         return result;
     }

     get class_name() {
         return this[class_name_sym];
     }

     set class_name(class_name) {
         this[class_name_sym] = class_name;
     }

     get super_class() {
         return this[super_class_sym];
     }

     set super_class(super_class) {
         this[super_class_sym] = super_class;
     }

     get upper_module() {
         return this[upper_module_sym];
     }

     set upper_module(upper_module) {
         this[upper_module_sym] = upper_module;
     }

     get object() {
         return this[object_sym];
     }

     set object(object) {
         this[object_sym] = object;
     }

     static get SearchResult() {
         return SearchResult;
     }
}

class SearchResult {
    constructor() {
        this[method_sym] = null;
        this[is_current_class_method_sym] = false;
    }

    get method() {
        return this[method_sym];
    }

    set method(method) {
        this[method_sym] = method;
    }

    get is_current_class_method() {
        return this[is_current_class_method_sym];
    }

    set current_class_method(is_current_class_method) {
        this[is_current_class_method] = is_current_class_method;
    }
}

window[iris_sym] = Object.assign({}, window[iris_sym], { IrisClass });