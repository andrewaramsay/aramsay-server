'use strict';
require('./lodash-mixins');

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const Router = require('express').Router;
const mongoose = require('mongoose');
const passport = require('passport');
const AnonymousStrategy = require('passport-anonymous').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const HttpServer = require('./HttpServer');
const AuthController = require('./api/AuthController');
const defaults = require('./config/defaults');
const Resolver = require('./core/Resolver');
const DetailedErrorHandler = require('./core/DetailedErrorHandler');
const SimpleErrorHandler = require('./core/SimpleErrorHandler');

class SimpleServer {
  constructor(options) {
    const self = this;
    self.options = defaults.applyDefaults(options);
    self._app = express();
    self._router = new Router();
    self._middlewares = {};
    self._initDependencies();
  }

  _initDependencies() {
    const self = this;
    let resolver = new Resolver(self.options);

    self._authenticationService = resolver.resolveAuthenticationService();
    self._usersService = resolver.resolveUsersService();
    self._authControllerFactory = resolver.resolveAuthController.bind(resolver);
  }

  configureRoutes(routeConfig) {
    const self = this;
    if (self._started) {
      throw new Error('Cannot configure routes after SimpleServer has been started.');
    }

    self._routeConfig = routeConfig;
  }

  start(callback) {
    const self = this;

    self._configureExpress();
    self._configureMongoose();
    self._configurePassport();
    self._configureRoutes();
    self._configureAuthRoutes();
    self._configureErrorHandlers();

    self._startServers(callback);
    self._started = true;
  }

  _configureExpress() {
    const self = this;
    self._app.use(bodyParser.json({ limit: self.options.requestSizeLimit() }));
  }

  _configureMongoose() {
    const self = this;
    //mongoose.connect(self.options.mongoConnectionString());
  }

  _configurePassport() {
    const self = this;
    if (self.options.noAuthSystem()) {
      return;
    }

    self._app.use(passport.initialize());

    passport.use('token', new BearerStrategy(self._authenticationService.getUserByToken.bind(self._authenticationService)));
    passport.use('local', new LocalStrategy(self._authenticationService.authenticateUser.bind(self._authenticationService)));
    passport.use('anonymous', new AnonymousStrategy());

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => self._usersService.getUserById(id, done));

    self._addAvailableMiddleware('authenticate', passport);
  }

  _configureRoutes() {
    const self = this;
    self._routeConfig.configureRoutes(self._router, self._middlewares);
    self._app.use(self._router);
  }

  _configureAuthRoutes() {
    const self = this;
    if (self.options.noAuthSystem()) {
      return;
    }
    let authRouter = new Router();
    AuthController.configureRoutes(authRouter, self._middlewares, self._authControllerFactory);
    self._app.use(authRouter);
  }

  _configureErrorHandlers() {
    const self = this;
    let errorHandler = self.options.sendErrorDetailsInResponse()
      ? new DetailedErrorHandler()
      : new SimpleErrorHandler();

    errorHandler.configureErrorHandler(self._app);
  }

  _startServers(callback) {
    const self = this;
    let server = new HttpServer(self._app, self.options.port());
    server.start(_.ensureFunction(callback));
    // TODO: Get HttpsServer and HttpRedirectServer set up.  Use async to hit callback after all servers have started.
  }


  _addAvailableMiddleware(name, parent, parentName) {
    const self = this;
    parentName = parentName || name;
    self._middlewares[name] = parent[parentName].bind(parent);
  }
}

module.exports = SimpleServer;
