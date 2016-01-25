'use strict';
require('../reflect.shim');

function callMethod(factory, methodName) {
  return function () {
    let instance = factory();
    return Reflect.apply(instance[methodName], instance, arguments);
  };
}

module.exports = callMethod;
