'use strict';

function configureLogging(app, loggingService) {
  app.use(logRequests);

  function logRequests(req, res, next) {
    let logTitle = 'Request to url: ' + req.url;
    loggingService.createLogContext(logTitle, (err, contextId) => {
      if (err) {
        return next(err);
      }

      req.loggingContextId = contextId;
      loggingService.addLogEntry(contextId, 'Initial Request', next);
    });
  }
}

module.exports = configureLogging;
