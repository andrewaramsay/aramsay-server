'use strict';

const HttpStatus = require('http-status-codes');

const GlobalErrorHandler = require('./GlobalErrorHandler');

class DetailedErrorHandler extends GlobalErrorHandler {
  constructor(loggingService) {
    super(loggingService);
  }

  configureErrorHandler(app) {
    super.configureErrorHandler(app);

    app.use(DetailedErrorHandler._detailedErrorHandler);
  }

  static _detailedErrorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      name: err.name,
      message: err.message,
      stack: err.stack
    });
  }
}

module.exports = DetailedErrorHandler;
