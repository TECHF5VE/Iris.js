import { IrisValue } from "./IrisValue";
import { IrisMethod } from "./IrisMethod";
export declare enum IrisRuntTimeType {
    ClassDefineTime = 0,
    ModuleDefineTime = 1,
    InterfaceDefineTime = 2,
    RuntTime = 3,
}
export declare class IrisContextEnvironment {
    runt_time_type: IrisRuntTimeType;
    local_variable_map: Map<string, IrisValue>;
    upper_context: IrisContextEnvironment | null;
    current_method: IrisMethod | null;
}
