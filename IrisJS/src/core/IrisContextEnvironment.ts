import { IrisValue } from "./IrisValue"
import { IrisMethod } from "./IrisMethod"

export enum IrisRuntTimeType {
    ClassDefineTime,
    ModuleDefineTime,
    InterfaceDefineTime,
    RuntTime,
}

export class IrisContextEnvironment {
    public runt_time_type: IrisRuntTimeType = IrisRuntTimeType.RuntTime;
    public local_variable_map: Map<string, IrisValue> = new Map<string, IrisValue>();
    public upper_context: IrisContextEnvironment | null = null;
    public current_method: IrisMethod | null = null;

}