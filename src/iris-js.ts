import { IrisIntpr } from './util/IrisInterpreter';
import { IrisDev } from './util/IrisDevUtil';
import { IrisValue } from './core/IrisValue';
import { irisGrammer } from './parser/iris.lang';
const peg = require('pegjs');

if (!IrisIntpr.initialize()) {
    console.error('Initialize Error');
    IrisIntpr.shut_down();
} else {
    // DO: 1 + 1
    let left_value: IrisValue = IrisDev.create_int(1);
    let right_value: IrisValue = IrisDev.create_int(1);
    let result: IrisValue = IrisDev.call_instance_method(left_value, '+', [right_value], undefined, undefined);
    console.log('1 + 1 = ', IrisDev.get_int(result));
    console.log(irisGrammer);
    const parser = peg.generate(irisGrammer);
    // console.log(parser);
    const parse_result = parser.parse(';');
    console.log(parse_result);
    IrisIntpr.shut_down();
}
