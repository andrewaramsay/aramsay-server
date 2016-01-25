/* eslint max-nested-callbacks: 0 */
'use strict';

const expect = require('chai').expect;

const ConfigurationError = require('./ConfigurationError');
const defaults = require('./defaults');

describe('defaults', function () {
  let config = null;

  beforeEach(function () {
    config = {};
  });

  describe('port', function () {
    it('uses default when missing', function () {
      let options = defaults.applyDefaults(config);
      expect(options.port()).to.equal(defaults.port);
    });

    it('uses existing when specified', function () {
      const MY_PORT = 9999;
      config.port = MY_PORT;
      let options = defaults.applyDefaults(config);
      expect(options.port()).to.equal(MY_PORT);
    });
  });

  describe('requestSizeLimit', function () {
    it('uses default when missing', function () {
      let options = defaults.applyDefaults(config);
      expect(options.requestSizeLimit()).to.equal(defaults.requestSizeLimit);
    });

    it('uses existing when specified', function () {
      config.requestSizeLimit = '100mb';
      let options = defaults.applyDefaults(config);
      expect(options.requestSizeLimit()).to.equal('100mb');
    });
  });

  describe('sendErrorDetailsInResponse', function () {
    it('uses default when missing', function () {
      let options = defaults.applyDefaults(config);
      expect(options.sendErrorDetailsInResponse()).to.equal(defaults.sendErrorDetailsInResponse);
    });

    it('uses existing when specified as true', function () {
      config.sendErrorDetailsInResponse = true;
      let options = defaults.applyDefaults(config);
      expect(options.sendErrorDetailsInResponse()).to.equal(true);
    });

    it('uses existing when specified as false', function () {
      config.sendErrorDetailsInResponse = false;
      let options = defaults.applyDefaults(config);
      expect(options.sendErrorDetailsInResponse()).to.equal(false);
    });
  });

  describe('noAuthSystem', function () {
    it('uses default when missing', function () {
      let options = defaults.applyDefaults(config);
      expect(options.noAuthSystem()).to.equal(defaults.noAuthSystem);
    });

    it('uses existing when specified as true', function () {
      config.noAuthSystem = true;
      let options = defaults.applyDefaults(config);
      expect(options.noAuthSystem()).to.equal(true);
    });

    it('uses existing when specified as false', function () {
      config.noAuthSystem = false;
      let options = defaults.applyDefaults(config);
      expect(options.noAuthSystem()).to.equal(false);
    });
  });

  describe('mongoConnectionString', function () {
    it('throws an exception if not specified', function () {
      let options = defaults.applyDefaults(config);
      expect(() => options.mongoConnectionString()).to.throw(ConfigurationError, 'mongoConnectionString must be specified on the SimpleServer configuration object.');
    });

    it('uses existing when specified', function () {
      config.mongoConnectionString = 'some connection string';
      let options = defaults.applyDefaults(config);
      expect(options.mongoConnectionString()).to.equal('some connection string');
    });
  });

  describe('loginFailedSlowdownFactor', function () {
    it('uses default when missing', function () {
      let options = defaults.applyDefaults(config);
      expect(options.loginFailedSlowdownFactor()).to.equal(defaults.loginFailedSlowdownFactor);
    });

    it('uses existing when specified', function () {
      const SLOWDOWN = 2;
      config.loginFailedSlowdownFactor = SLOWDOWN;
      let options = defaults.applyDefaults(config);
      expect(options.loginFailedSlowdownFactor()).to.equal(SLOWDOWN);
    });
  });

  describe('loginFailedMaxWaitTime', function () {
    it('uses default when missing', function () {
      let options = defaults.applyDefaults(config);
      expect(options.loginFailedMaxWaitTime()).to.equal(defaults.loginFailedMaxWaitTime);
    });

    it('uses existing when specified', function () {
      const WAIT_TIME = 45;
      config.loginFailedMaxWaitTime = WAIT_TIME;
      let options = defaults.applyDefaults(config);
      expect(options.loginFailedMaxWaitTime()).to.equal(WAIT_TIME);
    });
  });

  describe('failedAttemptsWhenUserNotFound', function () {
    it('uses default when missing', function () {
      let options = defaults.applyDefaults(config);
      expect(options.failedAttemptsWhenUserNotFound()).to.equal(defaults.failedAttemptsWhenUserNotFound);
    });

    it('uses existing when specified', function () {
      const ATTEMPTS = 8;
      config.failedAttemptsWhenUserNotFound = ATTEMPTS;
      let options = defaults.applyDefaults(config);
      expect(options.failedAttemptsWhenUserNotFound()).to.equal(ATTEMPTS);
    });
  });

  describe('localTokenSecret', function () {
    it('uses default when missing', function () {
      let options = defaults.applyDefaults(config);
      expect(options.localTokenSecret()).to.equal(defaults.localTokenSecret);
    });

    it('uses existing when specified', function () {
      const SECRET = 'better secret than before';
      config.localTokenSecret = SECRET;
      let options = defaults.applyDefaults(config);
      expect(options.localTokenSecret()).to.equal(SECRET);
    });
  });

  describe('tokenDurationInSeconds', function () {
    it('uses default when missing', function () {
      let options = defaults.applyDefaults(config);
      expect(options.tokenDurationInSeconds()).to.equal(defaults.tokenDurationInSeconds);
    });

    it('uses existing when specified', function () {
      const TOKEN_DURATION = 500;
      config.tokenDurationInSeconds = TOKEN_DURATION;
      let options = defaults.applyDefaults(config);
      expect(options.tokenDurationInSeconds()).to.equal(TOKEN_DURATION);
    });
  });
});
