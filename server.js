require('dotenv').config();

const argv           = require('yargs').argv;
const migrate        = require('./src/migrate.js');
const orm            = require('./src/models/index.js');
const waitForIt      = require('./src/utils/waitForIt.js');
const winston        = require('winston');

const server    = require('./src/server.js');
const port      = process.env.SERVER_PORT || 8080;
const host      = process.env.SERVER_HOST || 'localhost';

process.env.LOG_PREFIX = process.env.LOG_PREFIX || 'MetadataService';

function runServer() {
  return new Promise((resolve, reject) => {
    server.listen(port, host, (err) => {
      if (err) {
        return reject(err);
      }

      winston.info(process.env.LOG_PREFIX, `Server started on ${host}:${port}`);
      resolve();
    });
  });
}

module.exports = waitForIt(orm.conf.host, orm.conf.port, 60000, 1000).then(() => {
  return orm
    .sequelize
    .authenticate()
  ;
}).then(() => {
  if (argv['run-with-migrations']) {
    return migrate().then(runServer);
  } else if (argv['migrate']) {
    return migrate();
  } else {
    return runServer();
  }
}).catch((e) => {
  winston.error(process.env.LOG_PREFIX, { error: e });
  process.exit(-1);
});