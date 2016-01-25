'use strict';

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const moment = require('moment');

const MILLISECONDS = 1000;

class AuthenticationService {
  constructor(options, usersRepository) {
    const self = this;
    self._options = options;
    self._usersRepository = usersRepository;
  }

  authenticateUser(username, password, callback) {
    const self = this;
    self._usersRepository.findUserByUsername(username, function (err, user) {
      if (err) {
        return callback(err);
      }

      if (!user) {
        return self._delayLoginFailedResponse(self._options.failedAttemptsWhenUserNotFound(), callback);
      }

      bcrypt.compare(password, user.password, function (compareErr, isMatch) {
        if (compareErr) {
          return callback(compareErr);
        }

        if (isMatch) {
          user.loginAttempts = 0;
          self._saveUser(user, callback, user);
        } else {
          user.loginAttempts += 1;
          self._saveFailedLoginAttempts(user, callback);
        }
      });
    });
  }

  _saveUser(user, callback, response, authError) {
    user.save(function (err) {
      if (err) {
        return callback(err);
      }

      callback(null, response, authError);
    });
  }

  _saveFailedLoginAttempts(user, callback) {
    const self = this;
    self._delayLoginFailedResponse(user.loginAttempts, function (err, userResponse, authError) {
      if (err) {
        return callback(err);
      }

      self._saveUser(user, callback, userResponse, authError);
    });
  }

  _delayLoginFailedResponse(failedAttempts, callback) {
    const self = this;

    let calculatedWaitTime = Math.pow(self._options.loginFailedSlowdownFactor(), failedAttempts);
    let waitTimeSeconds = Math.min(calculatedWaitTime, self._options.loginFailedMaxWaitTime());

    setTimeout(function () {
      callback(null, null, new Error('Invalid Username/Password, or account is locked.'));
    }, waitTimeSeconds * MILLISECONDS);
  }

  getUserByToken(token, callback) {
    let self = this;
    self._decode(token, function (err, payload, authErr) {
      if (err || authErr) {
        return callback(err, null, authErr);
      }

      if (moment().unix() > payload.exp) {
        return callback(null, null, new Error('Token Expired'));
      }

      let userId = payload.sub;
      self._usersRepository.findUserById(userId, callback);
    });
  }

  _decode(token, callback) {
    const self = this;
    let payload = null;
    try {
      payload = jwt.decode(token, self._options.localTokenSecret());
      return callback(null, payload);
    } catch (err) {
      if (err.message === 'Signature verification failed') {
        return callback(null, null, err);
      }
      return callback(err);
    }
  }

  createToken(iss, sub) {
    let self = this;
    let exp = moment().unix() + self._options.tokenDurationInSeconds();

    let payload = {
      iss,
      sub,
      exp
    };
    return {
      token: jwt.encode(payload, self._options.localTokenSecret()),
      exp
    };
  }
}

module.exports = AuthenticationService;
