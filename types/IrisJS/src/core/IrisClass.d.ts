import { IrisObject } from './IrisObject';
import { IrisValue } from './IrisValue';
import { IrisContextEnvironment } from './IrisContextEnvironment';
import { IrisThreadInfo } from './IrisThreadInfo';
import { IrisNativeClassBase } from '../interface/IrisNativeClassBase';
export declare class IrisClass {
    private className;
    private superClass;
    private upperModule;
    private involvedModules;
    private involvedInterfaces;
    private instanceMethod;
    private constances;
    private objectAllocMethod;
    object: IrisObject | null;
    constructor(externClass: IrisNativeClassBase);
    reset_all_methods_object(): void;
    create_new_instance(parameterList: IrisValue[] | null, context: IrisContextEnvironment | null, threadInfo: IrisThreadInfo | null): IrisValue;
}
