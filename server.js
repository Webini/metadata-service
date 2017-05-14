require('dotenv').config();

const { argv }   = require('yargs');
const migrate    = require('./src/migrate.js');
const winston    = require('winston');

const server     = require('./src/server.js');
const port       = process.env.SERVER_PORT || 8080;
const host       = process.env.SERVER_HOST || 'localhost';
const LOG_PREFIX = 'MetadataService';

function runServer() {
  return new Promise((resolve, reject) => {
    server.listen(port, host, (err) => {
      if (err) {
        return reject(err);
      }

      winston.info(LOG_PREFIX, `Server started on ${host}:${port}`);
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