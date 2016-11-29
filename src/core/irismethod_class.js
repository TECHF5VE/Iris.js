/**
 * IrisMethod class
 * Create by Hui on 2016-11-29
 */

const method_name_sym = Symbol("method_name");
const parameter_count_sym = Symbol("parameter_count");
const is_with_variable_parameter_sym = Symbol("is_with_variable_parameter");
const authority_sym = Symbol("authority");
const user_method_sym = Symbol("user_method");
const method_class_sym = Symbol("method_class");
const native_method_handle_sym = Symbol("native_method_handle");

const inline_NativeMethod = class {
    constructor() {

    }

}

const inline_UserMethod = class {

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

    static get MethodAuthority() {
        return inline_MethodAuthority;
    } 

    static get CallSide() {
        return inline_CallSide;
    }

    constructor(init_obj) {
        this[method_name_sym] = init_obj.method_name;
    }
}