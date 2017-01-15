/** 
 * IrisObject class
 * Create by Hui on 2016-11-29
 * Modified by DaraW on 2016-1-15
 */

import IrisMethod from "./iris_method";
import IrisValue from "./iris_value";
import $dev_util from "../util/iris_dev"

const class_sym = Symbol("class");
const instance_variables_sym = Symbol("instance_variables");
const instance_methods_sym  = Symbol("instance_methods_sym");
const native_object_sym = Symbol("native_object");
const object_id_sym = Symbol("object_id");

let inline_OBJECT_COUNT = 0;

export default class IrisObject {
    constructor() {
        this[instance_methods_sym] = new Map();
        this[instance_variables_sym] = new Map();
        this[class_sym] = null;
        this[native_object_sym] = null;
        this[object_id_sym] = ++inline_OBJECT_COUNT;
    }

    /*
    * parameter of *thread_info* is NO USE currently
    */
    call_instance_method(method_name, parameter_list, context, thread_info, callside) {
        let method = null;
        let is_current_method = false;

        if (this[instance_methods_sym].has(method_name)) {
            // Object's instance method
            method = this[instance_methods_sym].get(method_name);
            is_current_method = true;
        } else {
            // instance method in class
            let result = new IrisClass.SearchResult();
            this[class_sym].get_method(method_name, result);
            method = result.method;
            is_current_method = result.is_current_class_method;
        }

        if (method === null) {
            return $dev_util.nil
        }

        let call_result = null;
        let caller = IrisValue.wrap_object(this);

        if (callside === IrisMethod.CallSide.Inside) {
            
            if (is_current_method) {
                // Inside Call
                call_result = method.call(caller, parameter_list, context, thread_info);
            } else {
                // Outside Call
                if (method.get_authority() === IrisMethod.MethodAuthority.Personal) {
                    call_result = $dev_util.nil;
                } else {
                    call_result = method.call(caller, parameter_list, context, thread_info);
                }
            }

        }

        return call_result;

    }

    add_instance_method(method) {
        this[instance_methods_sym].set(method.get_method_name(), method);
    }

    add_instance_variable(name, value) {
        this[instance_variables_sym].set(name, value);
    }

    get_instance_variable(name) {
        return this[instance_variables_sym].get(name);
    }

    reset_all_methods_object() {
        for (let [method_name, method] of this[instance_methods_sym].entries()) {
            method.reset_methods_object();
        }
    }

    // Getters and Setters

    set class(new_class) {
        this[class_sym] = new_class; 
    }

    get class() {
        return this[class_sym];
    }

    set native_object(new_native_object) {
        this[native_object_sym] = new_native_object;
    }
    
    get native_object() {
        return this[native_object_sym];
    }

    get object_id() {
        return this[object_id_sym];
    }

}