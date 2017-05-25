const tmdb = require('tmdb-graphql');
const db = require('../../models/index.js');

const keys = {
  [db.File.TYPES.movie]: 'movie',
  [db.File.TYPES.tv]: 'tv'
};

/**
 * Retreive file movie or tv series associated with his name
 * @param {Object} filedata 
 * @return {Object} 
 */
module.exports = async (filedata) => {
  const output = Object.assign({}, filedata);

  let results = null;
  if (filedata.type === 'episode' && filedata.episode) {
    output.type = db.File.TYPES.tv; 
    output.season = output.season || 1;
    results = await tmdb.searchTv(output.title);
  } else if(filedata.type === 'movie') {
    output.type = db.File.TYPES.movie;
    results = await tmdb.searchMovie(output.title);
  } 

  if (!results || results.length <= 0) {
    output.type = db.File.TYPES.unknownMedia;
    return output;
  }

  output[keys[output.type]] = results[0];

  return output;
};