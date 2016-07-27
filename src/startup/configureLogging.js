'use strict';

function configureLogging(app, loggingService) {
  app.use(logRequests);

  function logRequests(req, res, next) {
    let logTitle = 'Request to url: ' + req.url;
    let oldWrite = res.write;
    let oldEnd = res.end;
    let chunks = [];


    res.write = function (chunk) {
      chunks.push(chunk);

      oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
      let endArgs = arguments;
      if (chunk) {
        chunks.push(chunk);
      }
      var body = Buffer.concat(chunks).toString('utf8');

      loggingService.addLogEntry(req.loggingContextId, 'Response Complete', body, (err) => {
        oldEnd.apply(res, endArgs);
      });
    };



    loggingService.createLogContext(logTitle, (err, contextId) => {
      if (err) {
        return next(err);
      }

      req.loggingContextId = contextId;
      loggingService.addLogEntry(contextId, 'Initial Request', req, next);
    });
  }
}

module.exports = configureLogging;
