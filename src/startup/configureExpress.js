'use strict';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


function configureExpress(app, options) {
  app.use(bodyParser.json({ limit: options.requestSizeLimit() }));
  if (options.allowCookies()) {
    app.use(cookieParser());
  }
}

module.exports = configureExpress;
