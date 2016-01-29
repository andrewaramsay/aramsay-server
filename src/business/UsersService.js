'use strict';

const bcrypt = require('bcrypt-nodejs');

class UsersService {
  constructor(options, usersRepository) {
    const self = this;
    self._options = options;
    self.usersRepository = usersRepository;
  }

  getUserById(id, callback) {
    const self = this;
    self.usersRepository.findUserById(id, callback);
  }

  createUser(user, password, callback) {
    const self = this;
    bcrypt.genSalt(self._options.saltIterations(), function (saltErr, salt) {
      if (saltErr) {
        return callback(saltErr);
      }

      bcrypt.hash(password, salt, null, function (hashErr, hashedPassword) {
        if (hashErr) {
          return callback(hashErr);
        }

        user.password = hashedPassword;
        self.usersRepository.saveUser(user, callback);
      });
    });
  }
}

module.exports = UsersService;
