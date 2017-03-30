// import { method } from './iris_method'

import { IrisIntpr } from "./util/IrisInterpreter"
import { IrisDev } from "./util/IrisDevUtil"
import { IrisValue } from "./core/IrisValue"

//export default class IrisClass {
//  constructor () {
//    console.log('Hello Iris')
//  }
//}

//const dummy: IrisClass = new IrisClass()

if (!IrisIntpr.initialize()) {
    IrisIntpr.shut_down();
} else {
    // DO: 1 + 1
    let left_value: IrisValue = IrisDev.create_int(1);
    let right_value: IrisValue = IrisDev.create_int(1);
    let result: IrisValue = IrisDev.call_instance_method(left_value, "+", [right_value],  undefined, undefined);

    console.log("1 + 1 = ", IrisDev.get_int(result));

    IrisIntpr.shut_down();
}