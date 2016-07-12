'use strict';

class LoggingService {
  constructor(loggingRepository) {
    const self = this;
    self.repository = loggingRepository;
  }

  createLogContext(title, callback) {
    const self = this;
    var startDate = new Date();
    var endDate = startDate;
    self.repository.createLogContext({ title, startDate, endDate, entries: [] }, callback);
  }

  addLogEntry(contextId, message, callback) {
    const self = this;
    var date = new Date();
    self.repository.addLogEntry(contextId, message, date, date, callback);
  }
}

module.exports = LoggingService;
