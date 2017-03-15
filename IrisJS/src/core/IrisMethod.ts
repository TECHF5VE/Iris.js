import { IrisValue } from "./IrisValue"
import { IrisContextEnvironment } from "./IrisContextEnvironment"

export interface IrisNativeMethod {
    (caller: IrisValue, parameters: IrisValue[], variable_parameters: IrisValue[], context: IrisContextEnvironment): IrisValue;
}

export class IrisMethod {

}

export enum IrisCallSide {
    InSide,
    OutSide,
}