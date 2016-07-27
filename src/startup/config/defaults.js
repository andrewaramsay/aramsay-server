'use strict';
require('../../util/lodash-mixins');

const _ = require('lodash');

const ConfigurationError = require('./ConfigurationError');


const port = 8990;
const httpPort = 8991;
const requestSizeLimit = '50mb';
const sendErrorDetailsInResponse = false;
const loginFailedSlowdownFactor = 1.5;
const loginFailedMaxWaitTime = 60;
const failedAttemptsWhenUserNotFound = 3;
const noAuthSystem = false;
const localTokenSecret = 'secret';
const tokenDurationInSeconds = 3600;
const saltIterations = 10;
const inaccessibleRedirectUrls = ['/api', '/auth'];
const allowCookies = false;
const requireSecureAuthCookie = true;
const enableVerboseLogging = true;

let defaults = {
  port,
  httpPort,
  requestSizeLimit,
  sendErrorDetailsInResponse,
  mongoConnectionString: noDefault('mongoConnectionString'),
  loginFailedSlowdownFactor,
  loginFailedMaxWaitTime,
  failedAttemptsWhenUserNotFound,
  noAuthSystem,
  localTokenSecret,
  tokenDurationInSeconds,
  saltIterations,
  sslPrivateKey: noDefault('sslPrivateKey'),
  sslCertificate: noDefault('sslCertificate'),
  sslPrivateKeyPassphrase: noDefault('sslPrivateKeyPassphrase'),
  inaccessibleRedirectUrls,
  allowCookies,
  requireSecureAuthCookie,
  enableVerboseLogging
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
