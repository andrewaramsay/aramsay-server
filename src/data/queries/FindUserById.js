'use strict';

const UserModel = require('../models/User');

class FindUserById {
  constructor(id) {
    const self = this;
    self._id = id;
  }

  get model() {
    return UserModel;
  }

  get populate() {
    return ['roles'];
  }

  get id() {
    const self = this;
    return self._id;
  }
}

module.exports = FindUserById;
