'use strict';

const _ = require('lodash');

function configureRoutes(simpleServer) {
  if (simpleServer._routeConfig && _.isFunction(simpleServer._routeConfig.configureRoutes)) {
    simpleServer._routeConfig.configureRoutes(simpleServer._router, simpleServer._middlewares);
    simpleServer._app.use(simpleServer._router);
  }
}

module.exports = configureRoutes;
