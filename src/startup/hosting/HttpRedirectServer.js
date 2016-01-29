'use strict';

const _ = require('lodash');
const express = require('express');
const HttpStatus = require('http-status-codes');

const HttpServer = require('./HttpServer');

class HttpRedirectServer extends HttpServer {
  constructor(config) {
    let app = express();
    super(app, config.httpPort());
    const self = this;

    self._app = app;
    self._config = config;
  }

  _init() {
    const self = this;
    self._initInaccessibleUrls();
    self._initRedirect();

    super._init();
  }

  _initInaccessibleUrls() {
    const self = this;
    _.forEach(self._config.inaccessibleRedirectUrls(), function (url) {
      self._app.use(url, function (req, res) {
        res.status(HttpStatus.BAD_REQUEST).send(`Cannot access ${url} over HTTP, use HTTPS`);
      });
    });
  }

  _initRedirect() {
    const self = this;
    let targetPort = self._config.port();
    self._app.use(function (req, res) {
      let redirectUrl = `https://${req.hostname}:${targetPort}${req.url}`;
      res.redirect(redirectUrl);
    });
  }
}

module.exports = HttpRedirectServer;
