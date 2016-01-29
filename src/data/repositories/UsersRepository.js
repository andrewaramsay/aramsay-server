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
    //if (username === 'admin') {
    //  return callback(null, {
    //    username,
    //    id: 'some_id',
    //    password: '$2a$10$WWh4.9CeVD0Hcrdtl8vb7.U.gvGiCPpmU8nqA1lEWFsnWCJ0SBrqm',
    //    loginAttempts: 2,
    //    save(callb) {
    //      callb();
    //    }
    //  });
    //}
    //
    //callback(null, null);
  }

  findUserById(id, callback) {
    const self = this;
    self.databaseExecutor.findById(new FindUserById(id), callback);
    //if (id === 'some_id') {
    //  return this.findUserByUsername('admin', callback);
    //}
    //
    //callback(null, null);
  }

  saveUser(user, callback) {
    const self = this;
    self.databaseExecutor.saveData(new CreateUser(user), callback);
  }
}

module.exports = UsersRepository;
