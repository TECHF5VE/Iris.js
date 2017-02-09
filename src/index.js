/**
 * This file is part of IrisJS
 * Created by Chi on 11/4/16.
 * Modified by DaraW on 2016-12-26
 */
import { IrisDev } from './irislang/util';
import { IrisInterpreter } from './irislang/iris_interpreter';

// console.log(IrisContextEnvironment);
// console.log(RunTimeType);

// const iris = new Iris();
// console.log(iris);

if(!IrisInterpreter.initialize()) {
    IrisInterpreter.shut_down();
}
// Compiler Front is Here
/*
    if($compiler.load_script_from_path("main.ir")) {
         IrisInterpreter.set_current_compiler($compiler) ;
         IrisInterpreter.run();
         IrisInterpreter.shut_down();
    }
*/

// Test 1 + 1
let left_var = IrisDev.create_int(1);
let right_var = IrisDev.create_int(2);
//
// let result = IrisDev.call_method(left_var, "+", [right_var], null, null);
//
// console.log(IrisDev.get_native_object_ref(result));
