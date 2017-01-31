/**
 * IrisDev class
 * created by Hui in 2016-12-4
 * Modified by DaraW on 2016-1-15
 */

import IrisObject from "../core/iris_object"
import IrisValue from "../core/iris_value"
import IrisMethod from "../core/iris_method"

import IrisInteger from "../native_classes/iris_integer"
import IrisFloat from "../native_classes/iris_float"
import IrisString from "../native_classes/iris_string"
import IrisUniqueString from "../native_classes/iris_unique_string"

import $interpreter from "../iris_interpreter.js";

import warn from "./iris_debug";

export const IrisDev = {
    get true() {
        return $interpreter.true;
    },

    get false() {
        return $interpreter.false;
    },

    get nil() {
        return $interpreter.nil;
    },

    call_method(obj, method_name, args, context, thread_info) {
        obj.call_instance_method(method_name, args, context, thread_info, IrisMethod.CallSide.OutSide);
    },

    is_class_object(obj) {
        return this.check_class(obj, "Class");
    },

    is_module_object() {
        return this.check_class(obj, "Module");
    },

    check_class(element, class_path)  {
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
        return $interpreter.get_class(class_path);
    },

    get_module(module_path) {
        return $interpreter.get_module(module_path);
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