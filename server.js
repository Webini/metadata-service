require('dotenv').config();
const Raven      = require('./src/raven.js');
const { argv }   = require('yargs');
const migrate    = require('./src/migrate.js');
const debug      = require('debug')('metadata-service');
const server     = require('./src/server.js');
const port       = process.env.SERVER_PORT || 8080;
const host       = process.env.SERVER_HOST || 'localhost';

function runServer() {
  return new Promise((resolve, reject) => {
    server.listen(port, host, (err) => {
      if (err) {
        return reject(err);
      }

      debug('Server started on %o:%o', host, port);
      resolve();
    });
  });
}


if (argv['run-with-migrations']) {
  module.exports = migrate().then(runServer);
} else if (argv['migrate']) {
  module.exports = migrate();
} else {
  module.exports = runServer();
}