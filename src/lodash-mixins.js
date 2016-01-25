'use strict';

const _ = require('lodash');

function ensureFunction(possibleFunction) {
  if (_.isFunction(possibleFunction)) {
    return possibleFunction;
  }

  return () => possibleFunction;
}

_.mixin({
  ensureFunction
});
