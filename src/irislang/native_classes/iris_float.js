/**
 * IrisFloat class
 * Created by DaraW on 2017-1-15
 */

import { 
    } from "../util/iris_symbol";

export default class IrisFloat {


    static get IrisFloatTag() {
        return IrisFloatTag;
    }
}

class IrisFloatTag {
    constructor(float) {
        this[float_sym] = float;
    }

}