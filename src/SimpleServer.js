'use strict';
require('./util/lodash-mixins')();

const _ = require('lodash');
const async = require('async');
const express = require('express');
const Router = require('express').Router;
const passport = require('passport');
const mustbe = require('mustbe');

const HttpServer = require('./startup/hosting/HttpServer');
const HttpsServer = require('./startup/hosting/HttpsServer');
const HttpRedirectServer = require('./startup/hosting/HttpRedirectServer');
const defaults = require('./startup/config/defaults');
const Resolver = require('./util/Resolver');

const createUser = require('./cli/createUser');

const configureAuthRoutes = require('./startup/configureAuthRoutes');
const configureErrorHandlers = require('./startup/configureErrorHandlers');
const configureExpress = require('./startup/configureExpress');
const configureMongoose = require('./startup/configureMongoose');
const configureMustbe = require('./startup/configureMustbe');
const configurePassport = require('./startup/configurePassport');
const configureRoutes = require('./startup/configureRoutes');

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

    self._activitiesRegistry = resolver.resolveActivitiesRegistry();
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

  configureActivities(activitiesConfig) {
    const self = this;
    if (self._started) {
      throw new Error('Cannot configure activities after SimpleServer has been started.');
    }

    activitiesConfig.configureActivities(self._activitiesRegistry);
  }

  start(callback) {
    const self = this;

    self._configureExpress();
    self._configureMongoose();
    self._configurePassport();
    self._configureMustbe();
    self._configureRoutes();
    self._configureAuthRoutes();
    self._configureErrorHandlers();

    self._startServers(callback);
    self._started = true;
  }

  createUser() {
    const self = this;
    createUser(self, self._resolver);
  }

  _configureExpress() {
    const self = this;
    configureExpress(self._app, self.options);
  }

  _configureMongoose() {
    const self = this;
    configureMongoose(self.options);
  }

  _configurePassport() {
    const self = this;
    if (self.options.noAuthSystem()) {
      return;
    }

    configurePassport(self._app, self._authenticationService, self._usersService);

    self._addAvailableMiddleware('authenticate', passport);
  }

  _configureMustbe() {
    const self = this;
    configureMustbe(self._activitiesRegistry.allActivities, self._activitiesRegistry.overrideRole);

    self._addAvailableMiddleware('authorized', mustbe.routeHelpers());
  }

  _configureRoutes() {
    const self = this;
    configureRoutes(self);
  }

  _configureAuthRoutes() {
    const self = this;
    if (self.options.noAuthSystem()) {
      return;
    }
    configureAuthRoutes(self);
  }

  _configureErrorHandlers() {
    const self = this;
    configureErrorHandlers(self._app, self.options);
  }

  _startServers(callback) {
    const self = this;

    let httpsServer = new HttpsServer(self._app, self.options);
    let httpRedirectServer = new HttpRedirectServer(self.options);
    async.parallel([
      cb => httpsServer.start(cb),
      cb => httpRedirectServer.start(cb)
    ], _.ensureFunction(callback));
  }

  _addAvailableMiddleware(name, parent, parentName) {
    const self = this;
    parentName = parentName || name;
    self._middlewares[name] = parent[parentName].bind(parent);
  }
}

module.exports = SimpleServer;
