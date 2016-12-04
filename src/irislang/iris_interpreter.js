/**
 * IrisInterpreter class
 * Created by Hui in 2016-12-4
 * 
 */

const root_method_hash_sym = Symbol("root_method_hash");
const root_constance_hash_sym = Symbol("root_constance_hash");
const root_global_value_hash_sym = Symbol("root_global_value_hash");

const true_sym = Symbol("true");
const false_sym = Symbol("false");
const nil_sym = Symbol("nil");

export var $interpreter = {

    initialize() {
        this[root_method_hash_sym] = new Map();
        this[root_constance_hash_sym] = new Map();
        this[root_global_value_hash_sym] = new Map();

        // this[true_sym] = 
    },

    run(srcipt_path) {
        
    },

    regist_class(class_obj) {
        
    },

    regist_module(module_obj) {

    },

    regist_interface(interface_obj) {

    },

    /**
     * class_name : maybe a raw String such as "A::B::C" or an array such as ["A", "B", "C"]
     */
    get_class(class_name) {
        if(typeof class_name == String) {

        } else {
            for(let elem of class_name) {
                if(typeof elem !=  String) {
                    throw new Error("Fuck You.");
                }
            }
        }
    },

    get_module(module_name) {
        
    },

    get_interface(interface_name) {
        
    },

    get true() {
        return this[true_sym];
    },

    get false() {
        return this[false_sym];;
    },

    get nil() {
        return this[nil_sym];
    },
}