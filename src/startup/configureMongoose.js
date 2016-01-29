'use strict';

const mongoose = require('mongoose');

function configureMongoose(options) {
  mongoose.connect(options.mongoConnectionString());
}

module.exports = configureMongoose;
