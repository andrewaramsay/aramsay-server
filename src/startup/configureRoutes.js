'use strict';

function configureRoutes(simpleServer) {
  simpleServer._routeConfig.configureRoutes(simpleServer._router, simpleServer._middlewares);
  simpleServer._app.use(simpleServer._router);
}

module.exports = configureRoutes;
