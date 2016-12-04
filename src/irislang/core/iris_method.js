/**
 * IrisMethod class
 * Create by Hui on 2016-11-29
 */

import IrisObject from "./iris_object";

const method_name_sym = Symbol("method_name");
const parameter_count_sym = Symbol("parameter_count");
const is_with_variable_parameter_sym = Symbol("is_with_variable_parameter");
const authority_sym = Symbol("authority");
const native_method_handle_sym = Symbol("native_method_handle");

const parameter_name_list_sym = Symbol("parameter_name_list");
const variable_parameter_name_sym = Symbol("variable_parameter_name");
const with_block_sym = Symbol("with_block");
const without_block_sym = Symbol("without_block");
const method_define_obj_sym = Symbol("method_define_obj")

const method_object_sym = Symbol("method_object_sym");

const _create_method_object_sym = Symbol("_create_method_object_sym");

const inline_NativeMethod = class {
    constructor(method_name, parameter_count, is_with_variable_parameter, authority, native_method_handle) {
        this[method_name_sym] = method_name;
        this[parameter_count_sym] = parameter_count;
        this[is_with_variable_parameter_sym] = is_with_variable_parameter;
        this[authority_sym] = authority;
        this[native_method_handle_sym] = native_method_handle;
    }

}

const inline_UserMethod = class {
    constructor(method_name, parameter_name_list, variable_parameter_name, with_block, without_block) {
        this[method_name_sym] = method_name;
        this[parameter_name_list_sym] = parameter_name_list;
        this[variable_parameter_name_sym] = variable_parameter_name;
        this[with_block_sym] = with_block;
        this[without_block_sym] = without_block_sym;
    }
}

const inline_MethodAuthority = {
    get Everyone() { return 0; },
    get Relative() { return 1; },
    get Personal() { return 2; },
}

const inline_CallSide = {
    get OutSide() { return 0; },
    get Inside()  { return 1; },
}

export default class IrisMethod {

    constructor(init_obj) {
        if(init_obj instanceof inline_NativeMethod) {
            this[method_name_sym] = init_obj[method_name_sym]
            this[parameter_count_sym] = init_obj[parameter_count_sym];
            this[is_with_variable_parameter_sym] = init_obj[is_with_variable_parameter_sym];
            this[authority_sym] = init_obj[authority_sym];
        } else if(init_obj instanceof inline_UserMethod) {
            this[method_name_sym] = init_obj[method_name_sym]
            this[parameter_count_sym] = init_obj[parameter_name_list_sym].size();
            this[is_with_variable_parameter_sym] = init_obj[variable_parameter_name_sym] == "";
            this[authority_sym] = init_obj[authority_sym];
        } else {
            throw new Error("Invalid parameter of init_obj.");
        }
        this[method_define_obj_sym] = init_obj;

        // if get class of Object
        // this[_create_method_object_sym]();
    }

    [_create_method_object_sym](object_class) { 
    }

    static get NativeMethod() {
        return inline_NativeMethod;
    }

    static get UserMethod() {
        return inline_UserMethod;
    }

    static get MethodAuthority() {
        return inline_MethodAuthority;
    } 

    static get CallSide() {
        return inline_CallSide;
    }
}