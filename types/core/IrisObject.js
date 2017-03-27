"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisMethod_1 = require("./IrisMethod");
const IrisValue_1 = require("./IrisValue");
const IrisDevUtil_1 = require("../util/IrisDevUtil");
class IrisObject {
    constructor() {
        this.class_object = undefined;
        this.native_object = undefined;
        this.instance_methods = new Map();
        this.instance_variables = new Map();
        this._object_id = ++IrisObject._OBJECT_COUNT;
    }
    static get OBJECT_COUNT() { return IrisObject._OBJECT_COUNT; }
    get object_id() {
        return this._object_id;
    }
    call_instance_method(method_name, parameter_list, context, thread_info, callSide) {
        //return new IrisValue()
        let method = undefined;
        let is_current_method = false;
        let result = {
            method: undefined,
            is_current_method: false,
        };
        if (this.instance_methods.has(method_name)) {
            method = this.instance_methods.get(method_name);
            is_current_method = true;
        }
        else {
            this.class_object.get_method(method_name, result);
        }
        method = result.method;
        is_current_method = result.is_current_method;
        if (method == undefined) {
            // Error
            return IrisDevUtil_1.IrisDev.nil();
        }
        let call_result;
        let caller = IrisValue_1.IrisValue.wrap_object(this);
        if (callSide == IrisMethod_1.IrisCallSide.InSide) {
            if (is_current_method) {
                call_result = method.call(caller, parameter_list, context, thread_info);
            }
            else {
                if (method.authority == IrisMethod_1.IrisMethodAuthority.Personal) {
                    // Error
                    call_result = IrisDevUtil_1.IrisDev.nil();
                }
                else {
                    call_result = method.call(caller, parameter_list, context, thread_info);
                }
            }
        }
        else {
            if (method.authority != IrisMethod_1.IrisMethodAuthority.Everyone) {
                // Error
                call_result = IrisDevUtil_1.IrisDev.nil();
            }
            else {
                call_result = method.call(caller, parameter_list, context, thread_info);
            }
        }
        return call_result;
    }
    add_instance_method(method) {
        this.instance_methods.set(method.name, method);
    }
    add_instance_variable(name, value) {
        this.instance_variables.set(name, value);
    }
    reset_all_methods_objcet() {
        for (let [name, method] of this.instance_methods) {
            method.reset_method_object();
        }
    }
}
IrisObject._OBJECT_COUNT = 0;
exports.IrisObject = IrisObject;
//# sourceMappingURL=IrisObject.js.map