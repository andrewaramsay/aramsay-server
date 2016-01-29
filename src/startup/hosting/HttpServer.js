'use strict';

const http = require('http');

class HttpServer {
  constructor(app, port) {
    const self = this;
    self._app = app;
    self._port = port;
    self._init();
  }

  _init() {
    const self = this;
    self._server = http.createServer(self._app);
  }

  start(callback) {
    const self = this;
    self._server.listen(self._port, function (err) {
      // TODO: Get a standard logging framework in place and utilize that.
      console.log(`Http Server listening on port ${self._port}`);
      if (err) {
        return callback(err);
      }

      callback();
    });
  }
}

module.exports = HttpServer;
