'use strict';

const _ = require('lodash');
const HttpStatus = require('http-status-codes');


function configureHttpRedirect(app, options) {
  inaccessibleRedirectUrls();
  initRedirect();

  function inaccessibleRedirectUrls() {
    _.forEach(options.inaccessibleRedirectUrls(), function (url) {
      app.use(url, function (req, res, next) {
        if (isInsecureRequest(req)) {
          res.status(HttpStatus.BAD_REQUEST).send(`Cannot access ${url} over HTTP, use HTTPS`);
        } else {
          next();
        }
      });
    });
  }

  function initRedirect() {
    app.use(function (req, res, next) {
      if (isInsecureRequest(req)) {
        let redirectUrl = `https://${req.hostname}${req.url}`;
        res.redirect(redirectUrl);
      } else {
        next();
      }
    });
  }

  function isInsecureRequest(req) {
    return req.headers['x-forwarded-proto'] !== 'https';
  }
}

module.exports = configureHttpRedirect;
