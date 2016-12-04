/** 
 * IrisObject class
 * Create by Hui on 2016-11-29
 */

const class_sym = Symbol("class");
const instance_variables_sym = Symbol("instance_variables");
const instance_methods_sym  = Symbol("instance_methods_sym");
const native_object_sym = Symbol("native_object");
const object_id_sym = Symbol("object_id");

var inline_OBJECT_COUNT = 0;

export default class IrisObject {
    constructor() {
        this[instance_methods_sym] = new Map();
        this[instance_variables_sym] = new Map();
        this[class_sym] = null;
        this[native_object_sym] = null;
        this[object_id_sym] = ++inline_OBJECT_COUNT
    }

    /*
    * parameter of *thread_info* is NO USE currently
    */
    call_instance_method(method_name, parameter_list, context, thread_info, callside) {
        
    }

    add_instance_method(method) {
        this[instance_methods_sym][method.name] = method;
    }

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