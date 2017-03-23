import { IrisValue } from "./IrisValue";
export var IrisRuntTimeType;
(function (IrisRuntTimeType) {
    IrisRuntTimeType[IrisRuntTimeType["ClassDefineTime"] = 0] = "ClassDefineTime";
    IrisRuntTimeType[IrisRuntTimeType["ModuleDefineTime"] = 1] = "ModuleDefineTime";
    IrisRuntTimeType[IrisRuntTimeType["InterfaceDefineTime"] = 2] = "InterfaceDefineTime";
    IrisRuntTimeType[IrisRuntTimeType["RuntTime"] = 3] = "RuntTime";
})(IrisRuntTimeType || (IrisRuntTimeType = {}));
export class IrisContextEnvironment {
    constructor() {
        this.runt_time_type = IrisRuntTimeType.RuntTime;
        this.local_variable_map = new Map();
        this.upper_context = null;
        this.current_method = null;
        this.running_type = null;
    }
    get_local_variable_whthin_chain(local_name) {
        return new IrisValue();
    }
    get_local_variable(local_name) {
        return new IrisValue();
    }
    add_local_variable(local_name, value) {
    }
}
//# sourceMappingURL=IrisContextEnvironment.js.map