"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisValue_1 = require("../core/IrisValue");
const IrisClass_1 = require("../core/IrisClass");
const IrisDevUtil_1 = require("../util/IrisDevUtil");
const IrisClassBase_1 = require("../native_classes/IrisClassBase");
const IrisObjectBase_1 = require("../native_classes/IrisObjectBase");
const IrisMethodBase_1 = require("../native_classes/IrisMethodBase");
const IrisNilClass_1 = require("../native_classes/IrisNilClass");
const IrisTrueClass_1 = require("../native_classes/IrisTrueClass");
const IrisFalseClass_1 = require("../native_classes/IrisFalseClass");
const IrisInteger_1 = require("../native_classes/IrisInteger");
const IrisFloat_1 = require("../native_classes/IrisFloat");
class IrisInterpreter {
    constructor() {
        this.method_class_generated = false;
        this.constances = new Map();
        this.global_values = new Map();
        this.main_methods = new Map();
    }
    get nil() {
        return this._nil;
    }
    get true() {
        return this._true;
    }
    get false() {
        return this._false;
    }
    add_main_method(name, method) {
        this.main_methods.set(name, method);
    }
    get_main_method(name) {
        let method = this.main_methods.get(name);
        // do not use undefined, just undefined
        if (method === undefined) {
            return undefined;
        }
        else {
            return method;
        }
    }
    add_constance(name, value) {
        this.constances.set(name, value);
    }
    get_constance(name) {
        let constance = this.constances.get(name);
        if (constance == undefined) {
            return undefined;
        }
        else {
            return constance;
        }
    }
    add_global_value(name, value) {
        this.global_values.set(name, value);
    }
    get_global_value(name) {
        let value = this.global_values.get(name);
        if (value == undefined) {
            return undefined;
        }
        else {
            return value;
        }
    }
    get_module(full_path) {
        if (typeof full_path == "string") {
        }
        else if (Array.isArray(full_path)) {
        }
    }
    get_class(full_path) {
        if (typeof full_path == "string") {
            let path_arr = full_path.split("::");
            return this.get_class(path_arr);
        }
        else if (Array.isArray(full_path)) {
            let class_name = full_path.pop();
            let tmp_upper_module = undefined;
            let tmp_value = undefined;
            if (full_path.length == 0) {
                tmp_value = this.get_constance(class_name);
                if (tmp_value == undefined) {
                    return undefined;
                }
                if (!IrisDevUtil_1.IrisDev.check_is_class_object(tmp_value)) {
                    return undefined;
                }
                return IrisDevUtil_1.IrisDev.get_native_object_ref(tmp_value).class_object;
            }
            else {
                tmp_upper_module = this.get_module(full_path);
                if (tmp_upper_module != undefined) {
                    tmp_value = tmp_upper_module.get_constance(class_name);
                    if (tmp_value != undefined && IrisDevUtil_1.IrisDev.check_is_class_object(tmp_value)) {
                        return IrisDevUtil_1.IrisDev.get_native_object_ref(tmp_value).class_object;
                    }
                }
                return undefined;
            }
        }
    }
    get_interface(full_path) {
    }
    regist_class(class_obj) {
        let upper_module = class_obj.native_upper_module_define();
        let class_name = class_obj.native_class_name_define();
        if (upper_module == undefined) {
            if (this.get_constance(class_name) != undefined) {
                return false;
            }
        }
        else if (upper_module.get_constance(class_name) != undefined) {
            return false;
        }
        let class_intern_obj = new IrisClass_1.IrisClass(class_obj);
        let class_value = IrisValue_1.IrisValue.wrap_object(class_intern_obj.object);
        if (upper_module == undefined) {
            this.add_constance(class_name, class_value);
        }
        else {
            upper_module.add_constance(class_name, class_value);
            upper_module.add_sub_class(class_intern_obj);
        }
        return true;
    }
    //public regist_module()
    initialize() {
        this.method_class_generated = false;
        this.regist_class(new IrisClassBase_1.IrisClassBase());
        IrisDevUtil_1.IrisDev.class_native_object = IrisDevUtil_1.IrisDev.get_native_object_ref(this.constances.get("Class").object).class_object;
        this.regist_class(new IrisObjectBase_1.IrisObjectBase());
        let a = IrisDevUtil_1.IrisDev.get_class("Object");
        IrisDevUtil_1.IrisDev.get_class("Class").super_class = IrisDevUtil_1.IrisDev.get_class("Object");
        this.regist_class(new IrisMethodBase_1.IrisMethodBase());
        this.method_class_generated = true;
        IrisDevUtil_1.IrisDev.get_class("Class").reset_all_methods_object();
        IrisDevUtil_1.IrisDev.get_class("Object").reset_all_methods_object();
        IrisDevUtil_1.IrisDev.get_class("Method").reset_all_methods_object();
        this.regist_class(new IrisInteger_1.IrisIntegerClass());
        IrisDevUtil_1.IrisDev.integer_native_object = IrisDevUtil_1.IrisDev.get_native_object_ref(this.constances.get("Integer").object).class_object;
        this.regist_class(new IrisFloat_1.IrisFloatClass());
        IrisDevUtil_1.IrisDev.float_native_object = IrisDevUtil_1.IrisDev.get_native_object_ref(this.constances.get("Float").object).class_object;
        this.regist_class(new IrisTrueClass_1.IrisTrueClass());
        this.regist_class(new IrisFalseClass_1.IrisFalseClass());
        this.regist_class(new IrisNilClass_1.IrisNilClass());
        this._true = IrisDevUtil_1.IrisDev.get_class("TrueClass").create_new_instance(undefined, undefined, undefined);
        this._false = IrisDevUtil_1.IrisDev.get_class("FalseClass").create_new_instance(undefined, undefined, undefined);
        this._nil = IrisDevUtil_1.IrisDev.get_class("NilClass").create_new_instance(undefined, undefined, undefined);
        return true;
    }
    shut_down() {
        return true;
    }
}
exports.IrisInterpreter = IrisInterpreter;
const IrisIntpr = new IrisInterpreter();
exports.IrisIntpr = IrisIntpr;
//# sourceMappingURL=IrisInterpreter.js.map