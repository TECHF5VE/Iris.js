import { IrisValue } from './IrisValue';
import { IrisMethod } from './IrisMethod';
export declare enum IrisRuntTimeType {
    ClassDefineTime = 0,
    ModuleDefineTime = 1,
    InterfaceDefineTime = 2,
    RuntTime = 3,
}
export declare class IrisContextEnvironment {
    runtTimeType: IrisRuntTimeType;
    localVariableMap: Map<string, IrisValue>;
    upperContext: IrisContextEnvironment | null;
    currentMethod: IrisMethod | null;
}
