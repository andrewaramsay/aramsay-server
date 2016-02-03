'use strict';

const _ = require('lodash');
const HttpStatus = require('http-status-codes');
const mustbe = require('mustbe');


function configureMustbe(allActivities) {
  mustbe.configure(function (config) {
    config.routeHelpers(function (routeHelpers) {
      routeHelpers.getUser(_getUser);
      routeHelpers.notAuthenticated(_notAuthenticated);
      routeHelpers.notAuthorized(_notAuthorized);
      routeHelpers.parameterMaps(function (paramsConfig) {
        _.forEach(allActivities, _mapParametersForActivity(paramsConfig));
      });
    });

    config.activities(function (activities) {
      activities.allow(_globalAllowRules);
      _.forEach(allActivities, _authorizeActivity(activities));
    });
  });

  function _getUser(req, callback) {
    callback(null, req.user);
  }

  function _notAuthenticated(req, res) {
    res.status(HttpStatus.UNAUTHORIZED).send('Not Authenticated');
  }

  function _notAuthorized(req, res) {
    res.status(HttpStatus.FORBIDDEN).send('Not Authorized');
  }

  function _globalAllowRules(identity, activity, callback) {
    let allowed = _.some(identity.user.roles, role => role.securityOverride === true);
    callback(null, allowed);
  }

  function _mapParametersForActivity(paramsConfig) {
    return function (activity) {
      if (!_.isFunction(activity.getParameters) || !activity.identifier) {
        return;
      }
      paramsConfig.map(activity.identifier, activity.getParameters.bind(activity));
    };
  }

  function _authorizeActivity(activities) {
    return function (activity) {
      if (!_.isFunction(activity.authorize) || !activity.identifier) {
        return;
      }

      activities.can(activity.identifier, function (identity, params, callback) {
        activity.authorize(identity.user, params, callback);
      });
    };
  }


}

module.exports = configureMustbe;
