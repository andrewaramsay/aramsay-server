'use strict';

const UserModel = require('../models/User');

class CreateUser {
  constructor(user) {
    const self = this;
    self.user = user;
  }

  get model() {
    return UserModel;
  }

  get data() {
    const self = this;
    return self.user;
  }
}

module.exports = CreateUser;
