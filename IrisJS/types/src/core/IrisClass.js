import { IrisObject } from "./IrisObject";
import { IrisValue } from "./IrisValue";
import { IrisDev } from "../util/IrisDevUtil";
export class IrisClass {
    constructor(extern_class) {
        this.class_name = "";
        this.super_class = null;
        this.upper_module = null;
        this.involved_modules = new Set();
        this.involved_interfaces = new Set();
        this.instance_method = new Map();
        this.constances = new Map();
        this.object_alloc_method = null;
        this.object = null;
        this.object_alloc_method = extern_class.native_alloc;
        let class_obj = IrisDev.get_class("Class");
        if (class_obj != null) {
            this.object = class_obj.create_new_instance(null, null, null).object;
        }
        else {
            this.object = new IrisObject();
            let tmpObj = this.object;
            tmpObj.class_object = this;
            tmpObj.native_object = extern_class.native_alloc();
        }
        extern_class.native_class_define(this);
    }
    reset_all_methods_object() {
    }
    create_new_instance(parameter_list, context, thread_info) {
        return new IrisValue();
    }
}
//# sourceMappingURL=IrisClass.js.map