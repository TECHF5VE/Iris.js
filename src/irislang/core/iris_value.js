/**
 * IrisValue class
 * Created by DaraW on 2017-1-15
 */

const object_sym = Symbol("object");

export default class IrisValue {
    constructor() {
        this[object_sym] = null;
    }

    set_object(obj) {
        this[object_sym] = obj;
    }

    get_object(obj) {
        return this[object_sym]
    }

    equals(value) {
        return this[object_sym] === value.get_object();
    }

    static wrap_object(obj) {
        let value = new IrisValue();
        value[object_sym] = obj;
        return value;
    }
    
}