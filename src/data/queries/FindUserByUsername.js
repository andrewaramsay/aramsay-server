'use strict';

const UserModel = require('../models/User');

class FindUserByUsername {
  constructor(username) {
    const self = this;
    self.username = username;
  }

  get model() {
    return UserModel;
  }

  get populate() {
    return ['roles'];
  }

  get condition() {
    const self = this;
    return {
      username: self.username.toLowerCase()
    };
  }
}

module.exports = FindUserByUsername;
