/* eslint no-console: 0 */
'use strict';

const yargs = require('yargs');
const connection = require('mongoose').connection;

function printUsage() {
  return `
This is a simple command line utility for creating users.  It *BYPASSES* any server level auth, and
writes directly to the database (hashing password), so it should only be used to set up initial admin
accounts, and regular user management should take place from within the application


Usage: node createUser.js -u <USERNAME> -p <PASSWORD>`;
}

function createUser(simpleServer) {
  let args = yargs
    .usage(printUsage())
    .alias('p', 'password')
    .alias('u', 'username')
    .demand(['username', 'password'])
    .argv;


  simpleServer._configureMongoose();

  let service = simpleServer._usersService;

  let user = {
    username: args.username,
    roles: ['systemAdmin'],
    permissions: []
  };
  service.createUser(user, args.password, function (err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`User ${user.username} created`);
    }

    connection.close();
  });
}


module.exports = createUser;
