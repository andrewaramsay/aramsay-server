'use strict';

const LogContextModel = require('../models/LogContext');

class AddLogEntry {
  constructor(contextId, message, payload, date, newEndDate) {
    const self = this;
    self.contextId = contextId;
    self.message = message;
    self.payload = payload;
    self.date = date;
    self.newEndDate = newEndDate;
  }

  get model() {
    return LogContextModel;
  }

  get id() {
    const self = this;
    return self.contextId;
  }

  get data() {
    const self = this;
    return { $push: { entries: { message: self.message, date: self.date, payload: self.payload } }, endDate: self.newEndDate };
  }
}

module.exports = AddLogEntry;
