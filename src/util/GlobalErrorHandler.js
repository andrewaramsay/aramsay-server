'use strict';

class GlobalErrorHandler {
  constructor(loggingService) {
    const self = this;
    self.loggingService = loggingService;
  }

  configureErrorHandler(app) {
    const self = this;
    app.use(self._logErrors);
  }

  _logErrors(err, req, res, next) {
    const self = this;
    self.loggingService.addLogEntry(req.loggingContextId, err.stack || err)
    // TODO: Get a good logging framework in place and use that here.
    console.error('Global Error:', err.stack || err);
    next(err);
  }
}

module.exports = GlobalErrorHandler;
