const filesPromise = require('./channels/queues/files.js');
const tmdbPromise = require('./channels/queues/tmdb.js');
const indexerPromise = require('./channels/queues/indexer.js');

module.exports = Promise.all([
  filesPromise,
  tmdbPromise,
  indexerPromise
]);