const countFilesFor = require('../../queries/countFilesFor.js');
const es = require('../../elastic.js');
const { normalize: normalizeFile, properties: fileProperties } = require('./file.js');
const { normalize: normalizeGenre, properties: genreProperties } = require('./genre.js');

async function normalize(movie) {
  return {
    id: movie.id,
    name: movie.title,
    genres: await normalizeGenre(await movie.getGenres()),
    original_name: movie.original_title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    overview: movie.overview,
    vote_average: movie.vote_average,
    files_count: await countFilesFor.movie(movie.id),
    run_time: movie.runtime,
    files: await normalizeFile(await movie.getFiles()),
    updated_at: movie.updated_at,
    created_at: movie.created_at
  };
}

module.exports = {
  index: async function(movie) {
    const body = await normalize(movie);
    return es.index({
      index: this.definition.index,
      type: 'movie',
      id: movie.id,
      body
    });
  },
  normalize,
  properties: {
    name: { type: 'text' },
    genres: {
      type: 'nested',
      dynamic: false,
      properties: genreProperties
    },
    original_name: { type: 'text' },
    overview: { type: 'text' },
    vote_average: { type: 'float' },
    files_count: { type: 'short' },
    run_time: { type: 'short' },
    files: {
      type: 'nested',
      dynamic: false,
      properties: fileProperties
    },
    created_at: { type: 'date' },
    updated_at: { type: 'date' }
  }
};