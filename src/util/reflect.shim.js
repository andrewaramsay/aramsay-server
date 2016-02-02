/* eslint prefer-reflect: 0 */
'use strict';

// I want to begin using the Reflect API as much as possible, so I want to keep the ESLint rule on.
// However, it is not natively supported in node, so I will cobble together a shim with only the
// functions I presently need.

global.Reflect = global.Reflect || {};
global.Reflect.apply = global.Reflect.apply || function (func, instance, args) {
  return Function.prototype.apply.call(func, instance, args);
};

global.Reflect.deleteProperty = global.Reflect.deleteProperty || function (target, propertyKey) {
  delete target[propertyKey];
};
