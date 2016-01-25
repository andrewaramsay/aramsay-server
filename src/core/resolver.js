'use strict';
// poor man's IoC, hard coded factories for creating each class in the system.


const AuthController = require('../api/AuthController');
const AuthenticationService = require('../business/AuthenticationService');
const UsersService = require('../business/UsersService');
const UsersRepository = require('../data/UsersRepository');


class Resolver {
  constructor(options) {
    const self = this;
    self.options = options;
    self._createSingletonInstances();
  }

  _createSingletonInstances() {
    // Instantiate anything that should be a singleton here and then just return it from the resolve function
  }

  resolveAuthController() {
    const self = this;
    return new AuthController(self.resolveAuthenticationService());
  }

  resolveAuthenticationService() {
    const self = this;
    return new AuthenticationService(self.options, self.resolveUsersRepository());
  }

  resolveUsersService() {
    return new UsersService();
  }

  resolveUsersRepository() {
    return new UsersRepository();
  }
}


module.exports = Resolver;
