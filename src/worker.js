const filesPromise = require('./channels/queues/files.js');
const tmdbPromise = require('./channels/queues/tmdb.js');

module.exports = Promise.all([
  filesPromise,
  tmdbPromise
]);