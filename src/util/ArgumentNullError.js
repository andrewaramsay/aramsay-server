'use strict';

class ArgumentNullError extends Error {
  constructor(argument) {
    super(`Argument '${argument}' cannot be null or undefined.`);
  }
}

ArgumentNullError.prototype.name = 'ArgumentNullError';

module.exports = ArgumentNullError;
