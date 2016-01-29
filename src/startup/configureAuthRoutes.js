'use strict';

const AuthController = require('../api/AuthController');

function configureAuthRoutes(simpleServer) {
  AuthController.configureRoutes(simpleServer._router, simpleServer._middlewares, simpleServer._authControllerFactory);
}

module.exports = configureAuthRoutes;
