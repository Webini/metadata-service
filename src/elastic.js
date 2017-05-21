const elasticsearch = require('elasticsearch');
const debug = require('debug')('elasticsearch');

function Logger() {
  this.error   = (err) => debug(`%o ${err}`, 'error');
  this.warning = (err) => debug(`%o ${err}`, 'warning');
  this.info    = (err) => debug(`%o ${err}`, 'info');
  this.debug   = (err) => debug(`%o ${err}`, 'debug');
  this.trace   = (httpMethod, requestUrl, requestBody, responseBody, responseStatus) => {
    debug(
      `%o ${httpMethod} ${requestUrl.path} %O` +
      `\n ${responseStatus} => %O`,
      'trace', requestBody || 'Empty body', responseBody
    );
  }; 
  this.close = () => {};
}


const client = elasticsearch.Client({
  sniffOnStart: true,
  host: process.env.ELASTICSEARCH_HOST,
  httpAuth: process.env.ELASTICSEARCH_AUTH,
  apiVersion: '5.4',
  log: Logger
});

module.exports = client;