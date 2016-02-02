'use strict';

const _ = require('lodash');
const express = require('express');

function configureStatic(simpleServer) {
  _.forEach(simpleServer._statics, function (staticRoute) {
    if (typeof staticRoute === 'string') {
      staticRoute = { path: staticRoute };
    }

    if (staticRoute.url) {
      simpleServer._app.use(staticRoute.url, express.static(staticRoute.path));
    } else {
      simpleServer._app.use(express.static(staticRoute.path));
    }
  });
}

module.exports = configureStatic;
