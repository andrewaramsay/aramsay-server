/* eslint no-unused-expressions: 0 */
'use strict';

let ArgumentNullError = require('./ArgumentNullError');
let requireParameters = require('./requireParameters');
let expect = require('chai').expect;

describe('requireParameters', function () {
  it('exists', function () {
    expect(requireParameters).to.exist;
  });

  it('throws ArgumentNullError when specified parameters are null', function () {
    let foo = null;
    expect(() => requireParameters({ foo })).to.throw(ArgumentNullError, 'foo');
  });

  it('throws ArgumentNullError when specified parameters are undefined', function () {
    let foo = undefined;
    expect(() => requireParameters({ foo })).to.throw(ArgumentNullError, 'foo');
  });

  it('throws ArgumentNullError when specified parameters are NaN', function () {
    let foo = NaN;
    expect(() => requireParameters({ foo })).to.throw(ArgumentNullError, 'foo');
  });

  it('does not throw when the specified parameters are truthy', function () {
    let foo = 'some real value';
    expect(() => requireParameters({ foo })).not.to.throw(ArgumentNullError);
  });

  it('does not throw when the specified parameters are false', function () {
    let foo = false;
    expect(() => requireParameters({ foo })).not.to.throw(ArgumentNullError);
  });

  it('does not throw when the specified parameters are zero', function () {
    let foo = 0;
    expect(() => requireParameters({ foo })).not.to.throw(ArgumentNullError);
  });

  it('does not throw when the specified parameters are empty strings', function () {
    let foo = '';
    expect(() => requireParameters({ foo })).not.to.throw(ArgumentNullError);
  });
});
