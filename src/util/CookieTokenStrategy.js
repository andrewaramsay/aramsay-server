'use strict';

const BearerStrategy = require('passport-http-bearer').Strategy;


class CookieTokenStrategy extends BearerStrategy {
  constructor(options, verify) {
    if (typeof options === 'function') {
      verify = options;
      options = {};
    }
    if (!verify) {
      throw new TypeError('CookieTokenStrategy requires a verify callback');
    }
    super(options, verify);
    const self = this;

    self.name = 'cookie-token';
    self._cookieName = options.cookieName || 'bearerToken';
  }

  authenticate(req) {
    const self = this;
    if (req.cookies && req.cookies[self._cookieName]) {
      let token = req.cookies[self._cookieName];

      req.headers = req.headers || {};
      req.headers.authorization = `Bearer ${token}`;
    }

    return super.authenticate(req);
  }
}


module.exports = CookieTokenStrategy;
