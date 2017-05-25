const es = require('../../elastic.js');
const { normalize: normalizeGenre, properties: genreProperties } = require('./genre.js');
const countFilesFor = require('../../queries/countFilesFor.js');

async function normalize(tv) {
  const runtimes = tv.episode_run_time;
  return {
    name: tv.name,
    genres: await normalizeGenre(await tv.getGenres()),
    original_name: tv.original_name,
    number_of_episodes: tv.number_of_episodes,
    number_of_seasons: tv.number_of_seasons,
    poster_path: tv.poster_path,
    backdrop_path: tv.backdrop_path,
    overview: tv.overview,
    vote_average: tv.vote_average,
    files_count: await countFilesFor.tv(tv.id),
    run_time: (runtimes && runtimes.length > 0 ? runtimes[0] : null),
    created_at: tv.created_at,
    updated_at: tv.updated_at
  };
}

module.exports = {
  index: async function(tv) {
    const body = await normalize(tv);
    return es.index({
      index: this.definition.index,
      type: 'tv',
      id: tv.id,
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
    number_of_episodes: { type: 'short' },
    number_of_seasons: { type: 'short' },
    overview: { type: 'text' },
    vote_average: { type: 'float' },
    files_count: { type: 'short' },
    run_time: { type: 'short' },
    created_at: { type: 'date' },
    updated_at: { type: 'date' }
  }
};