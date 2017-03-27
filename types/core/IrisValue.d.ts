import { IrisObject } from './IrisObject';
export declare class IrisValue {
    object: IrisObject | undefined;
    constructor();
    static wrap_object(obj: IrisObject): IrisValue;
}
