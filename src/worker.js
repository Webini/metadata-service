const filePromise = require('./queues/file.js');
const fetchMetadataPromise = require('./queues/fetchMetadata.js');

module.exports = Promise.all([
  fetchMetadataPromise,
  filePromise
]);