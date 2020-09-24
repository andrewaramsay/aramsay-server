'use strict';

const mongoose = require('mongoose');

function configureMongoose(options) {
  mongoose.Promise = Promise;
  mongoose.connect(options.mongoConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = configureMongoose;
