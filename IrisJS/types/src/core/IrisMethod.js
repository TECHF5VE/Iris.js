export var IrisMethodAuthority;
(function (IrisMethodAuthority) {
    IrisMethodAuthority[IrisMethodAuthority["Everyone"] = 0] = "Everyone";
    IrisMethodAuthority[IrisMethodAuthority["Relateive"] = 1] = "Relateive";
    IrisMethodAuthority[IrisMethodAuthority["Personal"] = 2] = "Personal";
})(IrisMethodAuthority || (IrisMethodAuthority = {}));
export var IrisCallSide;
(function (IrisCallSide) {
    IrisCallSide[IrisCallSide["InSide"] = 0] = "InSide";
    IrisCallSide[IrisCallSide["OutSide"] = 1] = "OutSide";
})(IrisCallSide || (IrisCallSide = {}));
export class IrisNativeMethod {
    constructor(method_name, parameter_count, is_with_varaible_parameter, authority, native_method_handle) {
        this.method_name = "";
        this.parameter_count = 0;
        this.is_with_varaible_parameter = false;
        this.authority = IrisMethodAuthority.Everyone;
        this.native_method_handle = null;
        this.method_name = method_name;
        this.parameter_count = parameter_count;
        this.is_with_varaible_parameter = is_with_varaible_parameter;
        this.authority = authority;
        this.native_method_handle = native_method_handle;
    }
}
export class IrisUserMethod {
    constructor(method_name, parameter_name_list, variable_parameter_name, with_block, without_block) {
        this.method_name = "";
        this.parameter_name_list = [];
        this.variable_parameter_name = "";
        this.method_name = method_name;
        this.parameter_name_list = parameter_name_list;
        this.variable_parameter_name = variable_parameter_name;
        this.with_block = with_block;
        this.without_block = without_block;
    }
}
export class IrisMethod {
}
//# sourceMappingURL=IrisMethod.js.map