'use strict';

const HttpStatus = require('http-status-codes');

const GlobalErrorHandler = require('./GlobalErrorHandler');

class SimpleErrorHandler extends GlobalErrorHandler {
  configureErrorHandler(app) {
    super.configureErrorHandler(app);
    app.use(SimpleErrorHandler._simpleErrorHandler);
  }

  static _simpleErrorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      name: err.name,
      message: err.message
    });
  }
}

module.exports = SimpleErrorHandler;
