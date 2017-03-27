"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IrisValue {
    constructor() {
        this.object = undefined;
    }
    static wrap_object(obj) {
        let value = new IrisValue();
        value.object = obj;
        return value;
    }
}
exports.IrisValue = IrisValue;
//# sourceMappingURL=IrisValue.js.map