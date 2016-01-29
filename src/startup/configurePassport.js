'use strict';

const passport = require('passport');
const AnonymousStrategy = require('passport-anonymous').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const LocalStrategy = require('passport-local').Strategy;

function configurePassport(app, authenticationService, usersService) {
  app.use(passport.initialize());

  passport.use('token', new BearerStrategy(authenticationService.getUserByToken.bind(authenticationService)));
  passport.use('local', new LocalStrategy(authenticationService.authenticateUser.bind(authenticationService)));
  passport.use('anonymous', new AnonymousStrategy());

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => usersService.getUserById(id, done));
}

module.exports = configurePassport;
