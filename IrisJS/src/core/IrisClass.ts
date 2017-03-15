
import { IrisObject } from './IrisObject'
import { IrisModule } from './IrisModule'
import { IrisInterface } from './IrisInterface'
import { IrisMethod, IrisNativeMethod } from './IrisMethod'
import { IrisValue } from './IrisValue'
import { IrisContextEnvironment } from './IrisContextEnvironment'
import { IrisThreadInfo } from './IrisThreadInfo'
import { IrisAllocFunc, IrisNativeClassBase } from '../interface/IrisNativeClassBase'
import { IrisDev } from '../util/IrisDevUtil'

export class IrisClass {

  private className: string = ''
  private superClass: IrisClass | null = null
  private upperModule: IrisModule | null = null

  private involvedModules: Set<IrisModule> = new Set<IrisModule>()
  private involvedInterfaces: Set<IrisInterface> = new Set<IrisInterface>()
  private instanceMethod: Map<string, IrisMethod> = new Map<string, IrisMethod>()
  private constances: Map<string, IrisValue> = new Map<string, IrisValue>()

  private objectAllocMethod: IrisAllocFunc | null = null

  public object: IrisObject | null = null

  public constructor (externClass: IrisNativeClassBase) {
    this.objectAllocMethod = externClass.native_alloc

    let classObj: IrisClass | null = IrisDev.get_class('Class')

    if (classObj != null) {
      this.object = classObj.create_new_instance(null, null, null).object
      // (tmpObj.native_object as IrisClassBase.IrisClassBasTag).class_object = this
    }
    else {
      this.object = new IrisObject()
      let tmpObj: IrisObject = this.object as IrisObject
      tmpObj.classObject = this
      tmpObj.nativeObject = externClass.native_alloc()
      // (tmpObj.native_object as IrisClassBase.IrisClassBasTag).class_object = this
    }

    externClass.native_class_define(this)

  }

  public reset_all_methods_object (): void {

  }

  public create_new_instance (parameterList: IrisValue[] | null, context: IrisContextEnvironment | null, threadInfo: IrisThreadInfo | null): IrisValue {
    return new IrisValue()
  }
}
