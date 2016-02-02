'use strict';

const moment = require('moment');
const HttpStatus = require('http-status-codes');

const callMethod = require('../util/callMethod');

class AuthController {
  static configureRoutes(router, middlewares, controllerFactory) {
    const authenticate = middlewares.authenticate;
    router.post('/auth/token', authenticate('local'), callMethod(controllerFactory, 'login'));
    router.post('/auth/logout', authenticate('anonymous'), callMethod(controllerFactory, 'logout'));
    router.get('/auth/token', authenticate('token'), callMethod(controllerFactory, 'refreshToken'));
    router.get('/auth/permissions', authenticate('token'), callMethod(controllerFactory, 'getPermissions'));
  }

  constructor(options, authenticationService) {
    const self = this;
    self._options = options;
    self._authenticationService = authenticationService;
  }

  login(req, res) {
    const self = this;
    self._sendToken(req, res);
  }

  logout(req, res) {
    res.clearCookie('bearerToken').sendStatus(HttpStatus.NO_CONTENT);
  }

  refreshToken(req, res) {
    const self = this;
    self._sendToken(req, res);
  }

  getPermissions(req, res) {
    res.json(req.user.permissions);
  }

  _sendToken(req, res) {
    const self = this;
    // TODO: use destructuring:   let { token, exp } = self._authenticationService.createToken(req.hostname, req.user.id);
    let response = self._authenticationService.createToken(req.hostname, req.user.id);
    let token = response.token;
    let exp = response.exp;
    if (self._options.allowCookies()) {
      let cookieConfig = {
        httpOnly: true,
        expires: moment.unix(exp).toDate()
      };

      if (self._options.requireSecureAuthCookie()) {
        cookieConfig.secure = true;
      } else {
        console.warn('WARNING! Sending auth cookie as insecure. This should only be used for local development.')
      }

      res.cookie('bearerToken', token, cookieConfig);
    }
    res.json({ token, exp });
  }
}

module.exports = AuthController;
