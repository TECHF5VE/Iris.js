
import { IrisObject } from './IrisObject'

export class IrisValue {
    public object: IrisObject | undefined = undefined

    public constructor() {

    }

    static wrap_object(obj: IrisObject) {
        let value = new IrisValue()
        value.object = obj
        return value
    }
}
