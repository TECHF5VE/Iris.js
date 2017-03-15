
import { IrisValue } from './IrisValue'
import { IrisMethod } from './IrisMethod'

export enum IrisRuntTimeType {
  ClassDefineTime,
  ModuleDefineTime,
  InterfaceDefineTime,
  RuntTime
}

export class IrisContextEnvironment {
  public runtTimeType: IrisRuntTimeType = IrisRuntTimeType.RuntTime
  public localVariableMap: Map<string, IrisValue> = new Map<string, IrisValue>()
  public upperContext: IrisContextEnvironment | null = null
  public currentMethod: IrisMethod | null = null
}

