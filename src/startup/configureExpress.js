'use strict';

const bodyParser = require('body-parser');


function configureExpress(app, options) {
  app.use(bodyParser.json({ limit: options.requestSizeLimit() }));
}

module.exports = configureExpress;
