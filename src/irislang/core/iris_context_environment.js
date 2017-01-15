/**
 * IrisValue class
 * Created by DaraW on 2017-1-15
 */

const running_type_sym = Symbol("running_type");
const run_time_type_sym = Symbol("run_time_type");
const local_variabl_map_sym = Symbol("local_variabl_map");
const upper_context_sym = Symbol("upper_context");
const current_method_sym = Symbol("current_method");
// const local_variabl_map_sym = Symbol("local_variabl_map");

const RunTimeType = {
    ClassDefineTime: 0,
		ModuleDefineTime: 1,
		InterfaceDefineTime: 2,
		RunTime: 3
}

export default class IrisContextEnvironment {
    constructor() {
        this[running_type_sym] = null;
        this[local_variabl_map_sym] = new Map();
        this[upper_context_sym] = null;
        this[current_method_sym] = null;
        this[run_time_type_sym] = RunTimeType.RunTime;
    }

    get_local_variable_within_chain(local_name) {
        let tmp = this;
        let value = null;
        while (tmp !== null) {
            value = tmp.get_local_variable(local_name);
            if (value !== null) {
                break;
            }
            tmp = tmp[upper_context_sym];
        }
        return value;

    }

    get_local_variable(local_name) {
        return this[local_variabl_map_sym].get(local_name);
    }

    add_local_variable(local_name, value) {
        this[local_variabl_map_sym].set(local_name, value);
    }


    get current_method() {
        return this[current_method_sym];
    }

    set current_method(current_method) {
        this[current_method_sym] = current_method;
    }

    get running_type() {
        return this[running_type_sym];
    }

    set running_type(running_type) {
        this[running_type_sym] = running_type;
    }

    get run_time_type() {
        return this[run_time_type_sym];
    }

    set run_time_type(run_time_type) {
        this[run_time_type_sym] = run_time_type;
    }

    get upper_context() {
        return this[upper_context_sym];
    }

    set upper_context(upper_context) {
        this[upper_context_sym] = upper_context;
    }
    
}