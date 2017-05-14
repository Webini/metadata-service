const fileEmitter = require('./listeners/file.js');
const fetchMetadataEmitter = require('./listeners/fetchMetadata.js');

module.exports = Promise.all([
  new Promise((resolve) => {
    fileEmitter.on('subscribed', () => resolve());
  }),
  new Promise((resolve) => {
    fetchMetadataEmitter.on('subscribed', () => resolve());
  })
]);