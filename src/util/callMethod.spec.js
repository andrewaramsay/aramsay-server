'use strict';

let expect = require('chai').expect;
let sinon = require('sinon');
let callMethod = require('./callMethod');

describe('callMethod', function () {
  class SomeClass {
    method() {}
  }

  let mock = null;

  beforeEach(function () {
    mock = sinon.mock(SomeClass.prototype);
  });

  afterEach(function () {
    mock.restore();
  });

  it('calls the specified method on the class', function () {
    mock.expects('method').once();

    callMethod(() => new SomeClass(), 'method')();

    mock.verify();
  });

  it('calls the specified method bound to the instance returned from factory', function () {
    let instance = new SomeClass();

    mock.expects('method').on(instance);

    callMethod(() => instance, 'method')();

    mock.verify();
  });

  it('returns the return value of the original method', function () {
    let expected = {};
    mock.expects('method').returns(expected);

    let actual = callMethod(() => new SomeClass(), 'method')();

    expect(actual).to.equal(expected);
  });

  it('passes the arguments along to the specified method', function () {
    let arg1 = {};
    let arg2 = {};
    mock.expects('method').withExactArgs(arg1, arg2);

    callMethod(() => new SomeClass(), 'method')(arg1, arg2);

    mock.verify();
  });

  it('calls factory for a new instance each time the method is called', function () {
    let factory = sinon.mock();
    factory.returns(new SomeClass());
    factory.thrice();

    let methodWrapped = callMethod(factory, 'method');

    methodWrapped();
    methodWrapped();
    methodWrapped();

    factory.verify();
  });
});
