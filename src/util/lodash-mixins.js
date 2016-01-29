'use strict';

const _ = require('lodash');

function ensureFunction(possibleFunction) {
  if (_.isFunction(possibleFunction)) {
    return possibleFunction;
  }

  return () => possibleFunction;
}

let mixinsApplied = false;

function applyMixins(lodash) {
  if (mixinsApplied && !lodash) {
    return;
  }

  lodash = lodash || _;

  mixinsApplied = true;


  lodash.mixin({
    ensureFunction
  });
}

module.exports = applyMixins;
