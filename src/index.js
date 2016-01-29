'use strict';

const SimpleServer = require('./SimpleServer');

SimpleServer.PermissionsActivity = require('./business/security/PermissionsActivity');
SimpleServer.ArgumentNullError = require('./util/ArgumentNullError');
SimpleServer.requireParameters = require('./util/requireParameters');
SimpleServer.callMethod = require('./util/callMethod');
SimpleServer.lodashMixins = require('./util/lodash-mixins');


module.exports = SimpleServer;
