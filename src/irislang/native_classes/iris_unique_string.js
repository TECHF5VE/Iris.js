/*
 * IrisUniqueString class
 * Created by Chi on 2017-01-19
 */
import { IrisClass } from '../core/iris_class';
import { IrisMethod } from '../core/iris_method';
import { IrisDev } from "../util/iris_dev";

console.log('iris_unique_string', IrisClass);

export class IrisUniqueString {
    static add_unique_string(unique_string, unique_obj) {
        IrisUniqueString.unique_string_cache[unique_string] = unique_obj;
        return unique_obj;
    }

    static get_unique_string(unique_string) {
        return IrisUniqueString.unique_string_cache[unique_string];
    }

    static to_string(irisValue, paramterList, variableParameterList, context, threadInfo) {
        const obj = IrisDev.get_native_object_ref(this);
        // return IrisDev.create_string(obj);
    }

    native_class_define(classObj) {
        classObj.add_instance_method(this.to_string, 'to_string', 0, false, IrisMethod.MethodAuthority.Everyone);
    }

    native_class_name_define() {
        return 'UniqueString';
    }

    native_super_class_define() {
        // return IrisDev.get_class("Object");
    }

    native_upper_module_define() {
        return null;
    }

    native_alloc() {
        return new IrisUniqueStringTag();
    }
}

IrisUniqueString.unique_string_cache = {};

const douge_IUST = {
    m_string: Symbol('m_string')
};

class IrisUniqueStringTag {
    constructor(m_string = '') {
        this[douge_IUST.m_string] = m_string;
    }

    get string() {
        return this[douge_IUST.m_string];
    }
}