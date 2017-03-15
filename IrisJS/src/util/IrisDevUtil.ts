import { IrisClass } from '../core/IrisClass'

export class IrisDevUtil {
  public get_class(path: string): IrisClass | null {
    return null
  }
}

const IrisDev: IrisDevUtil = new IrisDevUtil()

export { IrisDev }