'use strict';

const callMethod = require('../core/callMethod');

class AuthController {
  static configureRoutes(router, middlewares, controllerFactory) {
    const authenticate = middlewares.authenticate;
    router.post('/auth/token', authenticate('local'), callMethod(controllerFactory, 'login'));
    router.get('/auth/token', authenticate('token'), callMethod(controllerFactory, 'refreshToken'));
    router.get('/auth/permissions', authenticate('token'), callMethod(controllerFactory, 'getPermissions'));
  }

  constructor(authenticationService) {
    const self = this;
    self._authenticationService = authenticationService;
  }

  login(req, res) {
    const self = this;
    self._sendToken(req, res);
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
    res.json({ token, exp });
  }
}

module.exports = AuthController;
