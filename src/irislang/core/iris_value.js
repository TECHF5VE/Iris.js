/**
 * IrisValue class
 * Created by DaraW on 2017-1-15
 */

import { object_sym } from "../util/iris_symbol";

export default class IrisValue {
    constructor() {
        this[object_sym] = null;
    }

    set object(obj) {
        this[object_sym] = obj;
    }

    get object() {
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