/**
 * IrisDevUtil class
 * created by Hui in 2016-12-4
 * 
 */

import $interpreter from "../iris_interpreter.js";

export var $dev_util = {

    get true() {
        return $interpreter.true();
    },

    get false() {
        return $interpreter.false();
    },

    get nil() {
        return $interpreter.nil();
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

}