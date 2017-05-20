const Raven = require('raven');

module.exports = Raven.config(process.env.SENTRY_URL, {
  captureUnhandledRejections: true
}).install();
