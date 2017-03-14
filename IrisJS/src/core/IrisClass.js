"use strict";
class IrisClass {
    constructor(extern_class) {
        this.class_name = "";
        this.super_class = null;
        this.upper_module = null;
        this.involved_modules = new Set();
        this.involved_interfaces = new Set();
        this.instance_method = new Map();
        this.constances = new Map();
        this.object_alloc_method = null;
    }
    reset_all_methods_object() {
    }
}
exports.IrisClass = IrisClass;
//# sourceMappingURL=IrisClass.js.map