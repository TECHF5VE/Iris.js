import { IrisValue } from "./IrisValue"
import { IrisClass } from "./IrisClass"

export class IrisModule {


    public add_sub_class(class_obj: IrisClass): void {

    }

    public add_constance(name: string, value: IrisValue): void {

    }

    public get_constance(name: string): IrisValue | undefined {
        return undefined;
    }

}
