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
}
else {

    // DO: 1 + 1
    let left_value: IrisValue = IrisDev.create_int(1);
    let right_value: IrisValue = IrisDev.create_int(1);
    let result: IrisValue = IrisDev.call_instance_method(left_value, "+", [right_value], null, null);

    //console.log(IrisDev.get_native_object_ref<IrisIntegerTag>(result).integer);

    IrisIntpr.shut_down();
}