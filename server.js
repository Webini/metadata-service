require('dotenv').config();

const argv           = require('yargs').argv;
const migrate        = require('./src/migrate.js');
const winston        = require('winston');
const LOG_PREFIX     = 'MetadataService';

const server    = require('./src/server.js');
const port      = process.env.SERVER_PORT || 8080;
const host      = process.env.SERVER_HOST || 'localhost';

function runServer() {
  server.listen(port, host, () => {
    winston.info(LOG_PREFIX, `Server started on ${host}:${port}`);
  });
}

if (argv['run-with-migrations']) {
  migrate().then(runServer);
} else if (argv['migrate']) {
  migrate();
} else {
  runServer();
}