import { IrisMethod } from '../core';
import { IrisDev } from "../util/iris_dev";

export class IrisArray {
    native_class_name_define() {
        return "Array";
    }

    native_super_class_define() {
        return IrisDev.get_class("Object");
    }

    native_super_module_define() {
        return null;
    }

    native_alloc() {
        return [];
    }

    native_class_define(class_obj) {
        class_obj.add_instance_method(this.initialize, "__format", 0, true, IrisMethod.MethodAuthority.Everyone);
        class_obj.add_instance_method(this.at, "[]", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.add_instance_method(this.set, "[]=", 2, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.add_instance_method(this.push, "push", 1, false, IrisMethod.MethodAuthority.Everyone);
        class_obj.add_instance_method(this.pop, "pop", 0, false, IrisMethod.MethodAuthority.Everyone);
    }

    static initialize(self, parameter_list, variable_parameter_list, context, thread_info) {
        if(variable_parameter_list != null) {
			let array_list = IrisDev.get_native_object_ref(self);
			array_list.concat(variable_parameter_list);
		}
		
		return self;
    }

    static at(self, parameter_list, variable_parameter_list, context, thread_info) {
        let index = parameter_list[0];
        let array_list = IrisDev.get_native_object_ref(self);

        if(!IrisDev.check_class(index, "Integer")) {
			return IrisDev.nil;
		}

        let index_num = IrisDev.get_int(index);

        if(index_num < 0) {
			return array_list[(array_list.length - (-index_num % array_list.length))];
		} else {
			if(index_num > array_list.length) {
				for(let i = 0; i < index_num - array_list.length; ++i) {
					array_list.concat(IrisDev.nil);
				}
				
				return IrisDev.nil;
			}
			else {
				return array_list[index_num];
			}
		}
    }

    static set(self, parameter_list, variable_parameter_list, context, thread_info) {
        let index = parameter_list[0];
        let target_value = parameter_list[1];
        let array_list = IrisDev.get_native_object_ref(self);

        if(!IrisDev.check_class(index, "Integer")) {
			return IrisDev.nil;
		}

        let index_num = IrisDev.get_int(index);

        if(index_num < 0) {
			array_list[(array_list.length - (-index_num % array_list.length))] = target_value;
		} else {
			if(index_num >= array_list.length) {
				for(let i = 0; i < index_num - array_list.length; ++i) {
                    array_list.concat(IrisDev.nil);
				}
                array_list.concat(target_value);
			}
			else {
				array_list[index_num] = target_value;
			}
		}
		return self;
    }

    static push(self, parameter_list, variable_parameter_list, context, thread_info) {
        let target_value = parameter_list[0];
        let array_list = IrisDev.get_native_object_ref(self);
        array_list.push(target_value);
        return self;
    }

    static pop(self, parameter_list, variable_parameter_list, context, thread_info) {
        let array_list = IrisDev.get_native_object_ref(self);
        return array_list.pop();
    }

    static size(self, parameter_list, variable_parameter_list, context, thread_info) {
        let array_list = IrisDev.get_native_object_ref(self);
        return IrisDev.create_int(array_list.length);
    }
}