/**
 * This file is part of IrisJS.
 * Created by Chi on 10/11/2016.
 */
import Iris from '../../src/core/iris.class';

describe('Iris Class', function () {
    it('should say Hello Iris', function() {
        const iris = new Iris();
        iris.sayHi().should.equal('Hello, Iris');
    });
});