'use strict';
// poor man's IoC, hard coded factories for creating each class in the system.

const AuthController = require('../api/AuthController');
const AuthenticationService = require('../business/AuthenticationService');
const ActivitiesRegistry = require('../business/security/ActivitiesRegistry');
const LoggingService = require('../business/LoggingService');
const LoggingRepository = require('../data/repositories/LoggingRepository');
const UsersService = require('../business/UsersService');
const UsersRepository = require('../data/repositories/UsersRepository');
const DatabaseExecutor = require('../data/DatabaseExecutor');


class Resolver {
  constructor(options) {
    const self = this;
    self.options = options;
    self._createSingletonInstances();
  }

  _createSingletonInstances() {
    const self = this;
    self.databaseExecutor = new DatabaseExecutor();
    self.activitiesRegistry = new ActivitiesRegistry();
    // Instantiate anything that should be a singleton here and then just return it from the resolve function
  }

  resolveAuthController() {
    const self = this;
    return new AuthController(self.options, self.resolveAuthenticationService());
  }

  resolveActivitiesRegistry() {
    const self = this;
    return self.activitiesRegistry;
  }

  resolveAuthenticationService() {
    const self = this;
    return new AuthenticationService(self.options, self.resolveUsersRepository());
  }

  resolveUsersService() {
    const self = this;
    return new UsersService(self.options, self.resolveUsersRepository());
  }

  resolveLoggingService() {
    const self = this;
    return new LoggingService(self.resolveLoggingRepository());
  }

  resolveLoggingRepository() {
    const self = this;
    return new LoggingRepository(self.resolveDatabaseExecutor());
  }

  resolveUsersRepository() {
    const self = this;
    return new UsersRepository(self.resolveDatabaseExecutor());
  }

  resolveDatabaseExecutor() {
    const self = this;
    return self.databaseExecutor;
  }
}


module.exports = Resolver;
