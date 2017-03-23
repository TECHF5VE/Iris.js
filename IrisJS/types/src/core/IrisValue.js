export class IrisValue {
    constructor() {
        this.object = null;
    }
    static wrap_object(obj) {
        let value = new IrisValue();
        value.object = obj;
        return value;
    }
}
//# sourceMappingURL=IrisValue.js.map