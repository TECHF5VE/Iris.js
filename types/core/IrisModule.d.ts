import { IrisValue } from "./IrisValue";
import { IrisClass } from "./IrisClass";
export declare class IrisModule {
    add_sub_class(class_obj: IrisClass): void;
    add_constance(name: string, value: IrisValue): void;
    get_constance(name: string): IrisValue | undefined;
}
