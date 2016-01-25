'use strict';

class UsersRepository {
  findUserByUsername(username, callback) {
    if (username === 'admin') {
      return callback(null, {
        username,
        id: 'some_id',
        password: '$2a$10$WWh4.9CeVD0Hcrdtl8vb7.U.gvGiCPpmU8nqA1lEWFsnWCJ0SBrqm',
        loginAttempts: 2,
        save(callb) {
          callb();
        }
      });
    }

    callback(null, null);
  }

  findUserById(id, callback) {
    if (id === 'some_id') {
      return this.findUserByUsername('admin', callback);
    }

    callback(null, null);
  }
}

module.exports = UsersRepository;
