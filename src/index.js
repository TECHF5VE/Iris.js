/**
 * This file is part of IrisJS
 * Created by Chi on 11/4/16.
 * Modified by DaraW on 2016-12-26
 */
import Iris from "./irislang/core/iris_class";
import IrisMethod from "./irislang/core/iris_method";
import IrisContextEnvironment from "./irislang/core/iris_context_environment";
import { RunTimeType } from "./irislang/core/iris_context_environment";
import $dev_util from "./irislang/util/iris_dev"
import $interpreter from "./irislang/iris_interpreter.js";

// console.log(IrisContextEnvironment);
// console.log(RunTimeType);

// const iris = new Iris();
// console.log(iris);

if(!$interpreter.initialize()) {
    $interpreter.shut_down();
}
// Compiler Front is Here
/*
    if($compiler.load_script_from_path("main.ir")) {
        $interpreter.set_current_compiler($compiler) ;
        $interpreter.run();
        $interpreter.shut_down();
    }
*/

// Test 1 + 1
let left_var = $dev_util.create_int(1);
let right_var = $dev_util.create_int(2);

let result = $dev_util.call_method(left_var, "+", [right_var], null, null);

console.log($dev_util.get_native_object_ref(result));
