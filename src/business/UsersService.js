'use strict';

class UsersService {
  getUserById(id, callback) {
    callback(null, { id });
  }
}

module.exports = UsersService;
