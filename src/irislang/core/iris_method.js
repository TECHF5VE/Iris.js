/**
 * IrisMethod class
 * Create by Hui on 2016-11-29
 * Modified by DaraW on 2016-1-15
 */

import IrisObject from "./iris_object";
import IrisContextEnvironment, { RunTimeType } from "./iris_context_environment";
import $dev_util from "../util/iris_dev";
import warn from "../util/iris_debug"

import { 
        method_name_sym,
        parameter_count_sym,
        is_with_variable_parameter_sym,
        authority_sym,
        native_method_handle_sym,
        parameter_name_list_sym,
        variable_parameter_name_sym,
        with_block_sym,
        without_block_sym,
        method_define_obj_sym,
        method_object_sym,
        user_method_sym,
        _create_method_object_sym
    } from "../util/iris_symbol";

const inline_MethodAuthority = {
    get Everyone() { return 0; },
    get Relative() { return 1; },
    get Personal() { return 2; }
};

const inline_CallSide = {
    get OutSide() { return 0; },
    get Inside()  { return 1; }
};

class inline_NativeMethod {
    constructor(method_name, parameter_count, is_with_variable_parameter, authority, native_method_handle) {
        this[method_name_sym] = method_name;
        this[parameter_count_sym] = parameter_count;
        this[is_with_variable_parameter_sym] = is_with_variable_parameter;
        this[authority_sym] = authority;
        this[native_method_handle_sym] = native_method_handle;
    }
}

class inline_UserMethod {
    constructor(method_name, parameter_name_list, variable_parameter_name, with_block, without_block) {
        this[method_name_sym] = method_name;
        this[parameter_name_list_sym] = parameter_name_list;
        this[variable_parameter_name_sym] = variable_parameter_name;
        this[with_block_sym] = with_block;
        this[without_block_sym] = without_block;
    }

    get parameter_list() {
        return this[parameter_name_list_sym];
    }

    set parameter_list(parameter_list) {
        this[parameter_name_list_sym] = parameter_list;
    }

    get variable_parameter_name() {
        return this[variable_parameter_name_sym];
    }

    set variable_parameter_name(variable_parameter_name) {
        this[variable_parameter_name_sym] = variable_parameter_name;
    }

}

export default class IrisMethod {
    constructor(init_obj) {
        if(init_obj instanceof inline_NativeMethod) {
            this[method_name_sym] = init_obj[method_name_sym];
            this[parameter_count_sym] = init_obj[parameter_count_sym];
            this[is_with_variable_parameter_sym] = init_obj[is_with_variable_parameter_sym];
            this[authority_sym] = init_obj[authority_sym];
            this[native_method_handle_sym] = init_obj[native_method_handle_sym];
            this[user_method_sym] = null;
        } else if(init_obj instanceof inline_UserMethod) {
            this[method_name_sym] = init_obj[method_name_sym];
            this[parameter_count_sym] = init_obj[parameter_name_list_sym].length;
            this[is_with_variable_parameter_sym] = init_obj[variable_parameter_name_sym] == "";
            this[authority_sym] = init_obj[authority_sym];
            this[user_method_sym] = init_obj[user_method_sym];
        } else {
            throw new Error("Invalid parameter of init_obj.");
        }
        this[method_define_obj_sym] = init_obj;

        // if get class of Object
        let method_class = $dev_util.get_class("Method");
        if(method_class != null) {
            this.create_method_object(method_class);
        }

    }

    _create_new_context(caller, parameter_list, current_context, thread_info) {
        let new_contex = new IrisContextEnvironment();

        new_contex.run_time_type = RunTimeType.RunTime;
        new_contex.running_type = caller;
        new_contex.upper_context = current_context;
        new_contex.current_method = this;

        if (this[user_method_sym] !== null) {

            // with without block

            if(parameter_list != null && parameter_list.length !== 0) {
                let counter = 0;
                for (let value in this[user_method_sym].parameter_list) {
                    new_contex.add_local_variable(value, parameter_list[counter]);
                    ++counter;
                }
                
                // get the variable values
                if (this[is_with_variable_parameter_sym]) {
                    let variables = parameter_list.slice(counter, parameter_list.length);
                    let array_obj = $dev_util.create_array(variables);
                    new_contex.add_local_variable(this[user_method_sym].variable_parameter_name, array_obj);
                }
            }
        }
        
        return new_contex;
    }

    parameter_check(parameter_list) {
        if (parameter_list !== null && parameter_list.length > 0) {
            if (this[is_with_variable_parameter_sym]) {
                return parameter_list.length >= this[parameter_count_sym];
            } else {
                return parameter_list.length == this[parameter_count_sym];
            }
        } else {
            return this[parameter_count_sym] === 0;
        }
    }

    create_method_object(method_class) {
        let method_obj = method_class.create_new_instance(null, null, null);
        $dev_util.get_native_object_ref(method_obj).object = this;
        this[method_object_sym] = method_obj.object;
    }

    reset_methods_object() {
        this.create_method_object($dev_util.get_class("Method"));
    }

    call(caller, parameter_list, context, thread_info) {
        let result = null;

        if (this.parameter_check(this[parameter_name_list_sym])) {
            // Error
            warn("Invalid parameter of " + this[method_name_sym] + ".");
            return $dev_util.nil;
        }
        
        // Getter Setter

        let new_contex = this._create_new_context(caller, parameter_list, context, thread_info);
        let result = $dev_util.nil;

        if (parameter_list === null || parameter_list.length === 0) {
            if (this[user_method_sym] === null) {
                result = this[native_method_handle_sym](caller, null, null, new_contex, thread_info);
            } else {
                // user method call
                //result = this[native_method_handle_sym](caller, null, null, new_contex, thread_info);
            }
        } else {
            if (this[user_method_sym] === null) {
                let variable_values = null;
                let normal_parameters = null;
                if (parameter_list.length > this[parameter_count_sym]) {
                    variable_values = parameter_list.slice(this[parameter_count_sym], parameter_list.length);
                }
                if (this[parameter_count_sym] > 0) {
                    normal_parameters = parameter_list.slice(0, this[parameter_count_sym]);
                }
                result = this[native_method_handle_sym](caller, normal_parameters, variable_values, new_contex, thread_info);
            } else {
                // user method call
                // result = 
            }
        }

        return result;
    }

    call_main(array_list, context, thread_info) {
        if (!this.parameter_check(array_list)) {
            // Error
            warn("Invalid parameter of " + this[method_name_sym] + ".");
            return $dev_util.nil;
        }

        let new_context = this._create_new_context(null, array_list, context, thread_info);

        // user method call
        //return  
    }

    get authority() {
        return this[authority_sym];
    }

    set authority(authority) {
        this[authority_sym] = authority;
    }

    get method_name() {
        return this[method_name_sym];
    }

    set method_name(method_name) {
        this[method_name_sym] = method_name;
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