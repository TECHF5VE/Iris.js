import { IrisDev } from '../util';
import { IrisMethod, IrisValue } from "../core";
import {
        string_sym
    } from "../util/iris_symbol";

export class IrisObjectBase {

    native_class_name_define() {
        return "Object";
    }

    native_super_class_define() {
        return null;
    }

    native_super_module_define() {
        return null;
    }

    native_alloc() {
        return null;
    }

    native_class_define(class_obj) {
        class_obj.add_involved_module(IrisDev.get_module("Kernel"));

        class_obj.add_instance_method(IrisObjectBase, "Initialize", "__format", 0, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.add_instance_method(IrisObjectBase, "ToString", "to_string", 0, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.add_instance_method(IrisObjectBase, "Equal", "==", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.add_instance_method(IrisObjectBase, "NotEqual", "!=", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.add_instance_method(IrisObjectBase, "LogicAnd", "&&", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.add_instance_method(IrisObjectBase, "LogicOr", "||", 1, false, IrisMethod.MethodAuthority.Everyone);
    }

    static initialize(self, parameter_list, variable_parameter_list, context, thread_info) {
        return self;
    }

    static get_object_id(self, parameter_list, variable_parameter_list, context, thread_info) {
        return IrisDev.create_int(self.object.object_id);
    }

    static to_string(self, parameter_list, variable_parameter_list, context, thread_info) {
    		return IrisDev.create_string(`<${self.object.object_class.class_name}:${self.object.object_id()}>`);
    }

    static get_class(self, parameter_list, variable_parameter_list, context, thread_info) {
        return IrisValue.wrap_object(self.object.object_class.class_object);
    }

    static equal(self, parameter_list, variable_parameter_list, context, thread_info) {
        let right_value = parameter_list[0];
        return self.object == right_value.object ? IrisDev.true : IrisDev.false;
    }

    static not_equal(self, parameter_list, variable_parameter_list, context, thread_info) {
        let right_value = parameter_list[0];
        return self.object != right_value.object ? IrisDev.true : IrisDev.false;
    }

    static logic_or(self, parameter_list, variable_parameter_list, context, thread_info) {
        // let right_value = parameter_list[0];
        // if((!self.equals(IrisDev.false)) && !self.equals(IrisDev.nil)) {
    		// 	return IrisDev.true;
    		// }
    		// else if(!right_value.equals(IrisDev.false) && !right_value.equals(IrisDev.nil)){
    		// 	return IrisDev.true;
    		// }
    		// else {
    		// 	return IrisDev.false;
		    // }
    }

    static logic_and(self, parameter_list, variable_parameter_list, context, thread_info) {
        let right_value = parameter_list[0];
        if(self.equals(IrisDev.false) || self.equals(IrisDev.nil)) {
			return IrisDev.false;
		}
		else if(right_value.equals(IrisDev.false) || right_value.equals(IrisDev.nil)){
			return IrisDev.false;
		}
		else {
			return IrisDev.true;
		}
    }

}
