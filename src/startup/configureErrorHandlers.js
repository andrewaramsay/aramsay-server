'use strict';

const DetailedErrorHandler = require('../util/DetailedErrorHandler');
const SimpleErrorHandler = require('../util/SimpleErrorHandler');

function configureErrorHandlers(app, options, loggingService) {
  let errorHandler = options.sendErrorDetailsInResponse()
    ? new DetailedErrorHandler(loggingService)
    : new SimpleErrorHandler(loggingService);

  errorHandler.configureErrorHandler(app);
}

module.exports = configureErrorHandlers;
