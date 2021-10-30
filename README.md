# AuthT
This is an authentication API written in Typescript with Node.js, Express, MySQL and Sequelize.  The goal is to provide the following services.
* CRUD operations for user management protected by JWT tokens and roles
* Login operation that returns a JWT on successful login
* Verify operation to get the UserID and role(s) associated with a JWT
* Scheduled jobs that clean up expired data in the database

## Requirements
You will need Node.js and NPM to build and run this service. It was built with node 14.17 and npm 6.14.

## Building
Use `npm run build` to transpile the Typescript source into Javascript.

## Running
Use `npm start` to start the service.  Some defaults are used to configure the service.  These defaults are stored in the file config.js and can be overridden using environment variables.

## Seed Data

