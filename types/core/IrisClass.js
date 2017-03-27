"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisObject_1 = require("./IrisObject");
const IrisMethod_1 = require("./IrisMethod");
const IrisValue_1 = require("./IrisValue");
const IrisDevUtil_1 = require("../util/IrisDevUtil");
const IrisNativeClassBase_1 = require("../interface/IrisNativeClassBase");
const IrisInterpreter_1 = require("../util/IrisInterpreter");
class IrisClass {
    constructor(extern_class) {
        this.name = '';
        this.super_class = undefined;
        this.upper_module = undefined;
        this.involved_modules = new Set();
        this.involved_interfaces = new Set();
        this.instance_methods = new Map();
        this.constances = new Map();
        this.object_alloc_method = undefined;
        this.object = undefined;
        this.name = extern_class.native_class_name_define();
        this.super_class = extern_class.native_super_class_define();
        this.upper_module = extern_class.native_upper_module_define();
        this.object_alloc_method = extern_class.native_alloc;
        let class_obj = IrisDevUtil_1.IrisDev.class_native_object;
        if (class_obj != undefined) {
            this.object = class_obj.create_new_instance(undefined, undefined, undefined).object;
            IrisDevUtil_1.IrisDev.get_native_object_ref(this.object).class_object = this;
        }
        else {
            this.object = new IrisObject_1.IrisObject();
            let tmp_obj = this.object;
            tmp_obj.class_object = this;
            tmp_obj.native_object = extern_class.native_alloc();
            IrisDevUtil_1.IrisDev.get_native_object_ref(tmp_obj).class_object = this;
        }
        //extern_class.native_class_define(this);
        let define_descriptors = extern_class.native_class_define();
        for (let descriptor of define_descriptors) {
            Object.setPrototypeOf(descriptor, IrisNativeClassBase_1.IrisMethodDefineDescriptor.prototype);
            this.add_instance_method(descriptor);
        }
    }
    reset_all_methods_object() {
        this.object.reset_all_methods_objcet();
        for (let [name, method] of this.instance_methods) {
            method.reset_method_object();
        }
    }
    create_new_instance(parameter_list, context, threadInfo) {
        let object = new IrisObject_1.IrisObject();
        object.class_object = this;
        let native_obj = this.object_alloc_method();
        object.native_object = native_obj;
        if (IrisInterpreter_1.IrisIntpr.method_class_generated) {
            object.call_instance_method("__format", parameter_list == undefined ? [] : parameter_list, context, threadInfo, IrisMethod_1.IrisCallSide.OutSide);
        }
        return IrisValue_1.IrisValue.wrap_object(object);
    }
    add_instance_method(param) {
        if (param instanceof IrisMethod_1.IrisMethod) {
            this.instance_methods.set(param.name, param);
        }
        else if (param instanceof IrisNativeClassBase_1.IrisMethodDefineDescriptor) {
            let descriptor = {
                method_name: param.method_name,
                authority: param.authority,
                parameter_count: param.parameter_amount,
                is_with_varaible_parameter: param.is_with_variable_parameter,
                native_method_handle: param.native_method,
            };
            Object.setPrototypeOf(descriptor, IrisMethod_1.IrisNativeMethodDescriptor.prototype);
            let method = new IrisMethod_1.IrisMethod(descriptor);
            this.add_instance_method(method);
        }
    }
    inner_search_class_module_method(class_obj, method_name) {
        return undefined;
    }
    inner_get_method(class_obj, method_name) {
        let method = class_obj.instance_methods.get(method_name);
        if (method == undefined) {
            method = this.inner_search_class_module_method(class_obj, method_name);
        }
        return method;
    }
    get_method(method_name, result) {
        result.is_current_class_method = false;
        result.method = undefined;
        let method = this.inner_get_method(this, method_name);
        if (method != undefined) {
            result.is_current_class_method = true;
            result.method = method;
            return;
        }
        let cur_class = this.super_class;
        while (cur_class != undefined) {
            method = this.inner_get_method(cur_class, method_name);
            if (method != undefined) {
                result.is_current_class_method = false;
                result.method = method;
                return;
            }
            cur_class = cur_class.super_class;
        }
    }
}
exports.IrisClass = IrisClass;
//# sourceMappingURL=IrisClass.js.map