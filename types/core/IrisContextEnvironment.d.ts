import { IrisValue } from "./IrisValue";
import { IrisMethod } from "./IrisMethod";
import { IrisRunningObject } from "./IrisRunningObject";
export declare enum IrisRuntTimeType {
    ClassDefineTime = 0,
    ModuleDefineTime = 1,
    InterfaceDefineTime = 2,
    RuntTime = 3,
}
export declare class IrisContextEnvironment {
    runt_time_type: IrisRuntTimeType;
    local_variable_map: Map<string, IrisValue>;
    upper_context: IrisContextEnvironment | undefined;
    current_method: IrisMethod | undefined;
    running_type: IrisRunningObject | undefined;
    get_local_variable_whthin_chain(local_name: string): IrisValue;
    get_local_variable(local_name: string): IrisValue;
    add_local_variable(local_name: string, value: IrisValue): void;
}
