/**
 * IrisKernel Class
 * Created by Hui on 2017-1-31
 */
import { IrisMethod } from '../core';
import { warn, log } from '../util/iris_debug';
import { IrisDev } from "../util/iris_dev";

export class IrisKernel {
    native_module_name_define() {
        return "Kernel";
    }

    native_upper_module_define() {
        return null;
    }

    native_module_define(module_obj) {
        module_obj.add_class_method()
    }

    static print(self, parameter_list, variable_parameter_list, context, thread_info){
        if(variable_parameter_list != null) {
            variable_parameter_list.forEach(function(element) {
                if(IrisDev.check_class(element, "String")
                    || IrisDev.check_class(element, "UniqueString")) {
                    console.log(IrisDev.get_native_object_ref(element).string);
                }
                else {
                    let result = element.object.call_instance_method("to_string", null, context, thread_info, IrisMethod.CallSide.Outside);
                    console.log(IrisDev.get_native_object_ref(result).string);
                }
            }, this);
        }

        return IrisDev.nil;
    }
}