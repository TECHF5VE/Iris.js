import { IrisValue } from "./IrisValue";
export class IrisObject {
    constructor() {
        this.class_object = null;
        this.native_object = null;
        this.instance_methods = new Map();
        this.instance_variables = new Map();
        this._object_id = ++IrisObject._OBJECT_COUNT;
    }
    static get OBJECT_COUNT() { return IrisObject._OBJECT_COUNT; }
    get object_id() {
        return this._object_id;
    }
    call_instance_method(method_name, parameter_list, context, thread_info, call_side) {
        return new IrisValue();
    }
    add_instance_method(method) {
    }
    add_instance_variable(name, value) {
    }
    reset_all_methods_objcet() {
    }
}
IrisObject._OBJECT_COUNT = 0;
//# sourceMappingURL=IrisObject.js.map