'use strict';

class ConfigurationError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = ConfigurationError;
