'use strict';

const SimpleServer = require('./SimpleServer');

SimpleServer.ArgumentNullError = require('./util/ArgumentNullError');
SimpleServer.callMethod = require('./util/callMethod');
SimpleServer.lodashMixins = require('./util/lodash-mixins');
SimpleServer.PermissionsActivity = require('./business/security/PermissionsActivity');
SimpleServer.requireParameters = require('./util/requireParameters');
SimpleServer.mongoose = require('mongoose');


module.exports = SimpleServer;
