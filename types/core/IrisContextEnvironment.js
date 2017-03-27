"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IrisValue_1 = require("./IrisValue");
var IrisRuntTimeType;
(function (IrisRuntTimeType) {
    IrisRuntTimeType[IrisRuntTimeType["ClassDefineTime"] = 0] = "ClassDefineTime";
    IrisRuntTimeType[IrisRuntTimeType["ModuleDefineTime"] = 1] = "ModuleDefineTime";
    IrisRuntTimeType[IrisRuntTimeType["InterfaceDefineTime"] = 2] = "InterfaceDefineTime";
    IrisRuntTimeType[IrisRuntTimeType["RuntTime"] = 3] = "RuntTime";
})(IrisRuntTimeType = exports.IrisRuntTimeType || (exports.IrisRuntTimeType = {}));
class IrisContextEnvironment {
    constructor() {
        this.runt_time_type = IrisRuntTimeType.RuntTime;
        this.local_variable_map = new Map();
        this.upper_context = undefined;
        this.current_method = undefined;
        this.running_type = undefined;
    }
    get_local_variable_whthin_chain(local_name) {
        return new IrisValue_1.IrisValue();
    }
    get_local_variable(local_name) {
        return new IrisValue_1.IrisValue();
    }
    add_local_variable(local_name, value) {
    }
}
exports.IrisContextEnvironment = IrisContextEnvironment;
//# sourceMappingURL=IrisContextEnvironment.js.map