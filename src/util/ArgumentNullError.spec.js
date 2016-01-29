/* eslint no-unused-expressions: 0 */
'use strict';

let expect = require('chai').expect;
let ArgumentNullError = require('./ArgumentNullError');

describe('ArgumentNullError', function () {
  it('exists', function () {
    expect(ArgumentNullError).to.exist;
  });

  it('is an instance of Error', function () {
    let err = new ArgumentNullError('foo');
    expect(err).to.be.an.instanceOf(Error);
  });

  it('is an instance of ArgumentNullError', function () {
    let err = new ArgumentNullError('foo');
    expect(err).to.be.an.instanceOf(ArgumentNullError);
  });

  it('is the prototype of its instances', function () {
    let err = new ArgumentNullError('foo');
    expect(ArgumentNullError.prototype.isPrototypeOf(err)).to.be.true;
  });

  it('creates instances that have Error as their prototype', function () {
    let err = new ArgumentNullError('foo');
    expect(Error.prototype.isPrototypeOf(err)).to.be.true;
  });

  it('specifies ArgumentNullError as its constructor name', function () {
    let err = new ArgumentNullError('foo');
    expect(err.constructor.name).to.be.equal('ArgumentNullError');
  });

  it('specifies ArgumentNullError as its name property', function () {
    let err = new ArgumentNullError('foo');
    expect(err.name).to.be.equal('ArgumentNullError');
  });

  it('includes a message stating that the argument cannot be null', function () {
    let err = new ArgumentNullError('arg');
    expect(err.message).to.equal(`Argument 'arg' cannot be null or undefined.`);
  });

  it('serializes toString() by specifying the type and message', function () {
    let err = new ArgumentNullError('arg');
    expect(err.toString()).to.equal(`ArgumentNullError: Argument 'arg' cannot be null or undefined.`);
  });

  it('maintains the call stack functionality of the base Error class', function () {
    let err = {};
    one();
    function one() {
      two();
    }

    function two() {
      three();
    }

    function three() {
      err = new ArgumentNullError('arg');
    }

    expect(err.stack).to.match(/at three[\s\S]*at two[\s\S]*at one/);
  });
});
