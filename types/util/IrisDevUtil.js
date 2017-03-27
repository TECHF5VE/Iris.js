"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisObject_1 = require("../core/IrisObject");
const IrisValue_1 = require("../core/IrisValue");
const IrisInterpreter_1 = require("./IrisInterpreter");
const IrisMethod_1 = require("../core/IrisMethod");
class IrisDevUtil {
    get_class(path) {
        return IrisInterpreter_1.IrisIntpr.get_class(path);
    }
    get_module(path) {
        return IrisInterpreter_1.IrisIntpr.get_module(path);
    }
    get_native_object_ref(obj) {
        if (obj instanceof IrisValue_1.IrisValue) {
            return obj.object.native_object;
        }
        else if (obj instanceof IrisObject_1.IrisObject) {
            return obj.native_object;
        }
    }
    check_is_class_object(obj) {
        return obj.object.class_object == this.class_native_object;
    }
    check_is_integer(obj) {
        return obj.object.class_object == this.integer_native_object;
    }
    check_is_float(obj) {
        return obj.object.class_object == this.float_native_object;
    }
    create_int(value) {
        let tmp = this.integer_native_object.create_new_instance(undefined, undefined, undefined);
        this.get_native_object_ref(tmp).integer = Math.round(value);
        return tmp;
    }
    get_int(value) {
        if (this.check_is_integer(value)) {
            return this.get_native_object_ref(value).integer;
        }
        return 0;
    }
    create_float(value) {
        let tmp = this.float_native_object.create_new_instance(undefined, undefined, undefined);
        this.get_native_object_ref(tmp).float = value;
        return tmp;
    }
    get_float(value) {
        if (this.check_is_float(value)) {
            return this.get_native_object_ref(value).float;
        }
        return 0.0;
    }
    call_instance_method(obj, method_name, parameter_list, context, thread_info) {
        return obj.object.call_instance_method(method_name, parameter_list, context, thread_info, IrisMethod_1.IrisCallSide.OutSide);
    }
    nil() {
        return IrisInterpreter_1.IrisIntpr.nil;
    }
    false() {
        return IrisInterpreter_1.IrisIntpr.false;
    }
    true() {
        return IrisInterpreter_1.IrisIntpr.true;
    }
}
exports.IrisDevUtil = IrisDevUtil;
const IrisDev = new IrisDevUtil();
exports.IrisDev = IrisDev;
//# sourceMappingURL=IrisDevUtil.js.map