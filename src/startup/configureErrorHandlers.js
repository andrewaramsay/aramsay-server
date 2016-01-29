'use strict';

const DetailedErrorHandler = require('../util/DetailedErrorHandler');
const SimpleErrorHandler = require('../util/SimpleErrorHandler');

function configureErrorHandlers(app, options) {
  let errorHandler = options.sendErrorDetailsInResponse()
    ? new DetailedErrorHandler()
    : new SimpleErrorHandler();

  errorHandler.configureErrorHandler(app);
}

module.exports = configureErrorHandlers;
