'use strict';

const CreateLogContext = require('../queries/CreateLogContext');
const UpdateLogContext = require('../queries/UpdateLogContext');

class LoggingRepository {
  constructor(databaseExecutor) {
    const self = this;
    self.databaseExecutor = databaseExecutor;
  }

  createLogContext(logContext, callback) {
    const self = this;
    self.databaseExecutor.saveData(new CreateLogContext(logContext), callback);
  }

  addLogEntry(contextId, message, date, newEndDate, callback) {
    const self = this;
    self.databaseExecutor.updateRecordById(new AddLogEntry(contextId, message, date, newEndDate), callback);
  }
}

module.exports = LoggingRepository;
