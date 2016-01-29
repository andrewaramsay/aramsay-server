'use strict';

const OVERRIDE_ROLE = 'systemAdmin';

class ActivitiesRegistry {
  constructor() {
    const self = this;
    self.allActivities = [];
  }

  get overrideRole() {
    return OVERRIDE_ROLE;
  }

  registerActivity(activity) {
    const self = this;
    if (!self.validateActivity(activity)) {
      throw new Error('Invalid activity');
    }

    self.allActivities.push(activity);
  }

  validateActivity(activity) {
    return Boolean(activity);
  }
}

module.exports = ActivitiesRegistry;
