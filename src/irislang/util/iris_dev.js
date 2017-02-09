/**
 * IrisDev class
 * created by Hui in 2016-12-4
 * Modified by DaraW on 2016-1-15
 */
// import { IrisClass } from '../core/iris_class';
// import { IrisMethod } from '../core/iris_method';
// import { IrisObject, IrisValue, IrisMethod } from '../core';
// import { IrisInteger, IrisFloat, IrisString, IrisUniqueString } from '../native_classes';
// import { IrisInterpreter } from '../iris_interpreter';
import { error } from './iris_debug';
import { iris_sym } from '../util/iris_symbol';

const iris = {
    target(key) {
        if (typeof window[iris_sym][key] !== 'undefined' ) {
            return window[iris_sym][key];
        } else {
            error('No such target in Iris');
        }

    }
};

export const IrisDev = {
    get true() {
        return iris.IrisInterpreter.true;
    },

    get false() {
        return iris.IrisInterpreter.false;
    },

    get nil() {
        return iris.IrisInterpreter.nil;
    },

    call_method(obj, method_name, args, context, thread_info) {
        obj.call_instance_method(method_name, args, context, thread_info, iris.IrisMethod.CallSide.OutSide);
    },

    is_class_object(obj) {
        return this.check_class(obj, "Class");
    },

    is_module_object(obj) {
        return this.check_class(obj, "Module");
    },

    check_class(element, class_path) {
        let iris_class = this.get_class(class_path);

        if(iris_class == null) {
            warn("invalid path " + class_path);
        }

        return element.object.class === iris_class;
    },

    get_native_object_ref(value) {
        return value.object.native_object;
    },

    get_class(class_path) {
        const IrisInterpreter = iris.target('IrisInterpreter');
        return IrisInterpreter.get_class(class_path);
    },

    get_module(module_path) {
        const IrisInterpreter = iris.target('IrisInterpreter');
        return IrisInterpreter.get_module(module_path);
    },

    get_interface(interface_path) {

    },

    get_integer(value) {
        return this.get_native_object_ref(value).integer;
    },

    get_float(value) {
        return this.get_native_object_ref(value).float;
    },

    // UniqueString or String
    get_string(value) {
        return this.get_native_object_ref(value).string;
    },

    create_int(int_value) {
        const IrisInteger = iris.target('IrisInteger');
        console.log(IrisInteger.IrisIntegerTag);
        return this._create_native_object("Integer", new IrisInteger.IrisIntegerTag(int_value));
    },

    create_float(float_value) {
        return this._create_native_object("Float", new IrisFloat.IrisFloatTag(float_value));
    },

    create_string(string_value) {
        return this._create_native_object("String", new IrisString.IrisStringTag(string_value));
    },

    creat_array(elements) {

        let native_value = null;

        if(elements == null) {
            native_value = [];
        } else {
            native_value = elements.concat();
        }

        return this._create_native_object("Array", native_value);
    },

    create_unique_string(unique_string_value) {
        let obj = IrisUniqueString.get_unique_string(unique_string_value);
        if(obj != null) {
            return obj;
        }

        this._create_native_object("UniqueString", new IrisUniqueString.IrisUniqueStringTag(unique_string_value));

        IrisUniqueString.add_unique_string(unique_string_value, obj);
    },

    _create_native_object(class_name, native_value) {
        let tar_class = this.get_class(class_name);
        let tar_obj = new IrisObject();

        tar_obj.class = tar_class;
        tar_obj.native_object = native_value;

        return IrisValue.wrap_object(tar_obj);
    }
};