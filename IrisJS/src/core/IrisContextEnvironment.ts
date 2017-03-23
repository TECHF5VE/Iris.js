﻿import { IrisValue } from "./IrisValue"
import { IrisMethod } from "./IrisMethod"
import { IrisRunningObject } from "./IrisRunningObject"

export enum IrisRuntTimeType {
  ClassDefineTime,
  ModuleDefineTime,
  InterfaceDefineTime,
  RuntTime
}

export class IrisContextEnvironment {
    public runt_time_type: IrisRuntTimeType = IrisRuntTimeType.RuntTime;
    public local_variable_map: Map<string, IrisValue> = new Map<string, IrisValue>();
    public upper_context: IrisContextEnvironment | null = null;
    public current_method: IrisMethod | null = null;
    public running_type: IrisRunningObject | null = null;

    public get_local_variable_whthin_chain(local_name: string): IrisValue {
        return new IrisValue();
    }

    public get_local_variable(local_name: string): IrisValue {
        return new IrisValue();
    }

    public add_local_variable(local_name: string, value: IrisValue) : void {
        
    }
}