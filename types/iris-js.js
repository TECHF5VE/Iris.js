// import { method } from './iris_method'
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisInterpreter_1 = require("./util/IrisInterpreter");
const IrisDevUtil_1 = require("./util/IrisDevUtil");
//export default class IrisClass {
//  constructor () {
//    console.log('Hello Iris')
//  }
//}
//const dummy: IrisClass = new IrisClass()
if (!IrisInterpreter_1.IrisIntpr.initialize()) {
    IrisInterpreter_1.IrisIntpr.shut_down();
}
else {
    console.log(1);
    // DO: 1 + 1
    let left_value = IrisDevUtil_1.IrisDev.create_int(1);
    let right_value = IrisDevUtil_1.IrisDev.create_int(1);
    let result = IrisDevUtil_1.IrisDev.call_instance_method(left_value, "+", [right_value], undefined, undefined);
    console.log("1 + 1 = ", IrisDevUtil_1.IrisDev.get_int(result));
    IrisInterpreter_1.IrisIntpr.shut_down();
}
//# sourceMappingURL=iris-js.js.map