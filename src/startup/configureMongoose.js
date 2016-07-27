'use strict';

const mongoose = require('mongoose');

function configureMongoose(options) {
  mongoose.Promise = Promise;
  mongoose.connect(options.mongoConnectionString());
}

module.exports = configureMongoose;
