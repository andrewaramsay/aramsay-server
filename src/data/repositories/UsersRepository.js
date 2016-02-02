'use strict';

const CreateUser = require('../queries/CreateUser');
const FindUserById = require('../queries/FindUserById');
const FindUserByUsername = require('../queries/FindUserByUsername');

class UsersRepository {
  constructor(databaseExecutor) {
    const self = this;
    self.databaseExecutor = databaseExecutor;
  }

  findUserByUsername(username, callback) {
    const self = this;
    self.databaseExecutor.findOne(new FindUserByUsername(username), callback);
  }

  findUserById(id, callback) {
    const self = this;
    self.databaseExecutor.findById(new FindUserById(id), callback);
  }

  saveUser(user, callback) {
    const self = this;
    self.databaseExecutor.saveData(new CreateUser(user), callback);
  }
}

module.exports = UsersRepository;
