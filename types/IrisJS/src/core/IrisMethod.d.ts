import { IrisValue } from "./IrisValue";
import { IrisContextEnvironment } from "./IrisContextEnvironment";
export interface IrisNativeMethod {
    (caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment): IrisValue;
}
export declare class IrisMethod {
}
export declare enum IrisCallSide {
    InSide = 0,
    OutSide = 1,
}
