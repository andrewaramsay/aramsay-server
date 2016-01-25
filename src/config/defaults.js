'use strict';
require('../lodash-mixins');

const _ = require('lodash');

const ConfigurationError = require('./ConfigurationError');


const port = 8990;
const requestSizeLimit = '50mb';
const sendErrorDetailsInResponse = false;
const loginFailedSlowdownFactor = 1.5;
const loginFailedMaxWaitTime = 60;
const failedAttemptsWhenUserNotFound = 3;
const noAuthSystem = false;
const localTokenSecret = 'secret';
const tokenDurationInSeconds = 3600;

let defaults = {
  port,
  requestSizeLimit,
  sendErrorDetailsInResponse,
  mongoConnectionString: noDefault('mongoConnectionString'),
  loginFailedSlowdownFactor,
  loginFailedMaxWaitTime,
  failedAttemptsWhenUserNotFound,
  noAuthSystem,
  localTokenSecret,
  tokenDurationInSeconds
};

defaults.applyDefaults = function applyDefaults(config) {
  let options = {};

  _.forEach(defaults, function (value, key) {
    if (!_.isUndefined(config[key])) {
      value = config[key];
    }

    options[key] = _.ensureFunction(value);
  });

  return options;
};


function noDefault(name) {
  return function () {
    throw new ConfigurationError(`${name} must be specified on the SimpleServer configuration object.`);
  };
}

module.exports = defaults;
