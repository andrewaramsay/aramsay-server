'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RoleSchema = new Schema({
  _id: { type: String },
  displayName: { type: String },
  description: { type: String },
  permissions: [{
    name: { type: String },
    allow: { type: Boolean }
  }]
});


let RoleModel = mongoose.model('Role', RoleSchema);

module.exports = RoleModel;
