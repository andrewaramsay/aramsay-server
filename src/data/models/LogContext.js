'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LogContextSchema = new Schema({
  title: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  entries: [{
    date: { type: Date },
    message: { type: String }
  }]
});

let LogContextModel = mongoose.model('LogContext', LogContextSchema);

module.exports = LogContextModel;
