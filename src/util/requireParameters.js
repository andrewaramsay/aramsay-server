'use strict';

let ArgumentNullError = require('./ArgumentNullError');
let _ = require('lodash');

function requireParameters(params) {
  _.forEach(params, function (param, name) {
    if (_.isNull(param) || _.isUndefined(param) || _.isNaN(param)) {
      throw new ArgumentNullError(name);
    }
  });
}

module.exports = requireParameters;
