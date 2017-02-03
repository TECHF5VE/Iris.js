import { warn, log } from '../util/iris_debug';
import { IrisDev } from "../util/iris_dev";
import { IrisMethod } from '../core/iris_method';
import {
        string_sym
    } from "../util/iris_symbol";

export class IrisString {

    native_class_name_define() {
        return "String";
    }

    native_super_class_define() {
        return IrisDev.get_class("Object");
    }

    native_super_module_define() {
        return null;
    }

    native_alloc() {
        return new IrisStringTag("");
    }

    native_class_define(class_obj) {
        class_obj.add_instance_method(IrisString, "Add", "+", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.add_instance_method(IrisString, "Equal", "==", 1, false, IrisMethod.MethodAuthority.Everyone);
    }

    static add(self, parameter_list, variable_parameter_list, context, thread_info) {
        if(!IrisDev.check_class(parameter_list[0], "String")) {
			return IrisDev.nil;
		}

		let cself = self.object.native_object;
		let ctar = parameter_list[0].object.native_object;
		let result = cself.add(ctar);

		return IrisDev.create_string(result.string);
    }

    static equal(self, parameter_list, variable_parameter_list, context, thread_info) {
        if(!IrisDev.check_class(parameter_list[0], "String")) {
			return IrisDev.false;
		}

		let selfStr = IrisDev.get_native_object_ref(self);
		let rightStr = IrisDev.get_native_object_ref(parameter_list[0]);
		return selfStr.string.equals(rightStr.string) ? IrisDev.true : IrisDev.false;
    }

    static get IrisTrueClassTag() {
        return IrisTrueClassTag;
    }

}

class IrisStringTag {
    constructor(string) {
        this[string_sym] = string;
    }

    add(target) {
		return new IrisStringTag(this[string_sym] + target.string);
	}

    get string() {
        return this[string_sym];
    }

    set string(string) {
        this[string_sym] = string;
    }
}
