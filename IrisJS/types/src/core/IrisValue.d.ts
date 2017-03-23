import { IrisObject } from "./IrisObject";
export declare class IrisValue {
    object: IrisObject | null;
    constructor();
    static wrap_object(obj: IrisObject): IrisValue;
}
