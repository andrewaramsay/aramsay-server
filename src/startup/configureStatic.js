'use strict';

const _ = require('lodash');
const express = require('express');

function configureStatic(simpleServer) {
  _.forEach(simpleServer._statics, function (path) {
    simpleServer._app.use(express.static(path));
  });
}

module.exports = configureStatic;
