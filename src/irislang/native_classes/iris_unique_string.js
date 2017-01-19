/*
 * IrisUniqueString class
 * Created by Chi on 2017-01-19
 */

import { IrisClass, IrisMethod, IrisContextEnvironment, IrisModule, IrisValue } from '../core';
import { IrisDev } from '../util';

export class IrisUniqueString extends IrisClass {
    static sm_uniqueStringCache = {};

    static add_unique_string(uniqueString, uniqueObj) {
        IrisUniqueString.sm_uniqueStringCache[uniqueString] = uniqueObj;
        return uniqueObj;
    }

    static get_unique_string(uniqueString) {
        return IrisUniqueString.sm_uniqueStringCache[uniqueString];
    }

    static to_string(irisValue, paramterList, variableParameterList, context, threadInfo) {
        const obj = IrisDev.get_native_object_ref(this);
        return IrisDev.create_string(obj)
    }

    get native_class_define(classObj) {
        classObj.add_instance_method(IrisUniqueString.class, 'ToString', 'to_string', 0, false, MethodAuthority.Everyone);
    }

    get native_class_name_define() {
        return 'UniqueString';
    }

    get native_super_class_define() {
        return IrisDev.get_class("Object");
    }

    get native_upper_module_define() {
        return null;
    }

    get native_alloc() {
        return new IrisUniqueStringTag();
    }
}

const douge_IUST = {
    m_string: Symbol('m_string')
};

class IrisUniqueStringTag {
    constructor(m_string = '') {
        this[douge_IUST.m_string] = m_string;
    }

    get get_string() {
        return this[douge_IUST.m_string];
    }
}