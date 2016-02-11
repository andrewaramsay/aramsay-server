'use strict';

const SimpleServer = require('./SimpleServer');

SimpleServer.ArgumentNullError = require('./util/ArgumentNullError');
SimpleServer.callMethod = require('./util/callMethod');
SimpleServer.PermissionsActivity = require('./business/security/PermissionsActivity');
SimpleServer.requireParameters = require('./util/requireParameters');
SimpleServer.mongoose = require('mongoose');
SimpleServer.lodash = require('lodash');
require('./util/lodash-mixins');

SimpleServer.Models = {};
SimpleServer.Models.UserModel = require('./data/models/User');
SimpleServer.Models.RoleModel = require('./data/models/User');

module.exports = SimpleServer;
