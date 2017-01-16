/**
 * This file is part of IrisJS.
 * Created by DaraW on 2017-1-16
 */

// IrisClass
export const class_name_sym = Symbol("class_name");
export const super_class_sym = Symbol("super_class");
export const upper_module_sym = Symbol("upper_module");
export const object_sym = Symbol("object");
export const instance_methods_sym = Symbol("instance_methods");
export const constances_sym  = Symbol("constances");
export const class_variables_sym = Symbol("class_variables");
export const method_name_sym = Symbol("method_name");
export const method_sym = Symbol("method");
export const is_current_class_method_sym = Symbol("is_current_class_method");
export const involved_modules_sym = Symbol("involved_modules");
export const involved_interfaces_sym = Symbol("involved_interfaces");
export const extern_class_sym = Symbol("extern_class");

// IrisContextEnviroment
export const running_type_sym = Symbol("running_type");
export const run_time_type_sym = Symbol("run_time_type");
export const local_variabl_map_sym = Symbol("local_variabl_map");
export const upper_context_sym = Symbol("upper_context");
export const current_method_sym = Symbol("current_method");

// IrisMethod
export const parameter_count_sym = Symbol("parameter_count");
export const is_with_variable_parameter_sym = Symbol("is_with_variable_parameter");
export const authority_sym = Symbol("authority");
export const native_method_handle_sym = Symbol("native_method_handle");
export const parameter_name_list_sym = Symbol("parameter_name_list");
export const variable_parameter_name_sym = Symbol("variable_parameter_name");
export const with_block_sym = Symbol("with_block");
export const without_block_sym = Symbol("without_block");
export const method_define_obj_sym = Symbol("method_define_obj");
export const method_object_sym = Symbol("method_object_sym");
export const _create_method_object_sym = Symbol("_create_method_object_sym");

// IrisObject
export const class_sym = Symbol("class");
export const instance_variables_sym = Symbol("instance_variables");
export const native_object_sym = Symbol("native_object");
export const object_id_sym = Symbol("object_id");