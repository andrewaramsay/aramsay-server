'use strict';

const LogContextModel = require('../models/LogContext');

class CreateLogContext {
  constructor(logContext) {
    const self = this;
    self.logContext = logContext;
  }

  get model() {
    return LogContextModel;
  }

  get data() {
    const self = this;
    return self.logContext;
  }
}

module.exports = CreateUser;
