/**
 * IrisDev class
 * created by Hui in 2016-12-4
 * Modified by DaraW on 2016-1-15
 */

import $interpreter from "../iris_interpreter.js";

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

    is_class_object() {

    },

    check_class(element, class_path)  {

    },

    get_native_object_ref(obj) {

    },

    get_class(class_path) {

    },

    get_module(module_path) {

    },

    get_interface(interface_path) {

    },

    create_int(int_value) {

    },

    create_float(float_value) {

    },

    create_string(string_value) {

    },

    create_unique_string(string_value) {

    }
};