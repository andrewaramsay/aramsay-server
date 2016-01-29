'use strict';

const async = require('async');
const fs = require('fs');
const https = require('https');
const Q = require('q');

const HttpServer = require('./HttpServer');

class HttpsServer extends HttpServer {
  constructor(app, config) {
    super(app, config, config.port());
  }

  _init() {
    const self = this;

    self._serverPromise = new Q.Promise(function (resolve, reject) {
      async.parallel({
        privateKey: cb => fs.readFile(self._config.sslPrivateKey(), 'utf8', cb),
        certificate: cb => fs.readFile(self._config.sslCertificate(), 'utf8', cb)
      }, function (err, results) {
        if (err) {
          return reject(err);
        }

        let credentials = {
          key: results.privateKey,
          passphrase: self._config.sslPrivateKeyPassphrase(),
          cert: results.certificate
        };

        self._server = https.createServer(credentials, self._app);
        resolve();
      });
    });
  }

  start(callback) {
    const self = this;
    const baseStart = super.start.bind(self);
    self._serverPromise.then(function () {
      baseStart(callback);
    });
  }
}

module.exports = HttpsServer;
