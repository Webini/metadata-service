const LOG_PREFIX = 'SearchController';

module.exports = {
  LOG_PREFIX: LOG_PREFIX,
  
  searchConstraints: {
    types: { presence: true, inclusion: [ 1, 2 ] },
    search: { presence: true }
  },

  /**
   * Search for a movie
   */
  search: (req, res, next) => {
  }
};