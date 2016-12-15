const LOG_PREFIX = 'SearchController';
const guessit    = require('guessit-exec');

module.exports = {
  LOG_PREFIX: 'SearchController',
  
  parseConstraints: {
    filename: { presence: true } 
  },

  /**
   * Extract metadata from filename
   */
  parse: (req, res, next) => {
    guessit(req.body.filename)
      .then((data) => res.apiSuccess(data))
      .catch((e) => res.apiError(LOG_PREFIX, 'Cannot parse filename', e));
  }
};