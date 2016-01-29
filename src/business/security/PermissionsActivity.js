'use strict';

const _ = require('lodash');

class PermissionsActivity {
  constructor(identifier) {
    const self = this;
    self._identifier = identifier;
  }

  get identifier() {
    const self = this;
    return self._identifier;
  }

  authorize(user, params, callback) {
    const self = this;
    let isAllowed = _.some(user.permissions, permission => permission.name === self.identifier && permission.allow);
    callback(null, isAllowed);
  }
}

module.exports = PermissionsActivity;
