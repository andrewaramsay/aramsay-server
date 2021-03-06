# ARamsay Server
This is a simple express server with no routes configured*.  The idea is that it can be dropped into a MEAN project, and all the
boilerplate of getting the server started will be taken care of.  You begin coding with adding routes to an express router, and
focusing your development time on business logic rather than configuring authentication/authorization, logging, error handling,
etc.

* I may add some pre-build auth routes in the future



*disclaimer* this project is primarily written to make my life easier.  It is built around my preferred structure of
MEAN stack applications, and may lack configuration options necessary for use in a different context.




# Usage

In your main `server.js` file, simply instantiate the server, call into your routes config (see below), and call `.start()`.

		// server.js
    const SimpleServer = require('simple-server');
		const config = require('./config');
		const routesConfig = require('./routesConfig');

    let simpleServer = new SimpleServer(config);

    simpleServer.configureRoutes(routesConfig);

    simpleServer.start();


The `SimpleServer` constructor takes in a single parameter, a config object containing the options described below.  It can be specified inline
but the `server.js` file can be kept much cleaner by putting it in its own module.
		// config.js
		module.exports = {
			// ...
		};


Your `routesConfig.js` file must export an object with a single method on it: `configureRoutes`.  It can be a class with other methods
you use to set up other dependencies, or it can be a simple object literal with a configure function.
		// routesConfig.js
		module.exports = {
			configure(router, middlewares) {
				router.get('/api/my-resource', function () {
					/* ... */
			  });
			}
		};


# Options

TBD

# Authentication

A basic authentication system is in place.  This supports 3 authentication strategies pre configured to work with the users in the database.
* 'local' - Looks for a username/password in the request body.  It will verify the credentials against the database. (used internally for obtaining an auth token).
* 'token' - Looks for an 'Authorization: Bearer SOME_JWT_TOKEN' header in the request.  It validates the token and finds the user identified in the payload.
* 'anonymous' - Allows access without any successful authentication.

All routes should specify the `authenticate()` middleware, and explicitly state if they allow anonymous access.  There is a custom eslint rule `require-authenticate` enabled by default
to assist in catching routes missing an `authenticate()` call.
