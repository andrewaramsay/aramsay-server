'use strict';
// Ensure roles are loaded in since they are referenced by Users
require('./Role');

const _ = require('lodash');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  loginAttempts: { type: Number, default: 0 },
  roles: [{ type: String, ref: 'Role' }]
});

UserSchema.virtual('permissions').get(getPermissions);

/**
 * @this UserModel
 * @returns {Object[]} List of all permissions
 * */
function getPermissions() {
  const self = this;

  return _(self.roles)
    .map(role => role.permissions)
    .flatten()
    .uniqBy(permission => permission.name)
    .value();
}

let UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
