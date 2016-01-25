'use strict';

class GlobalErrorHandler {
  configureErrorHandler(app) {
    const self = this;
    app.use(self._logErrors);
  }

  _logErrors(err, req, res, next) {
    // TODO: Get a good logging framework in place and use that here.
    console.error('Global Error:', err.stack || err);
    next(err);
  }
}

module.exports = GlobalErrorHandler;
