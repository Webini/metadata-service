const es = require('../../elastic.js');
const { File } = require('../../models/index.js');
const { normalize: normalizeFile, properties: fileProperties } = require('./file.js');
const { normalize: normalizeGenre, properties: genreProperties } = require('./genre.js');

async function normalize(season) {
  const tv = await season.getTv();
  const episodes = await season.getEpisodes({ 
    include: [ { model: File, required: true } ] 
  });
  const runtimes = tv.episode_run_time;
  const files = await episodes.reduce(async (promise, episode) => {
    const result = await promise;
    const files = await episode.getFiles();
    return result.concat(files);
  }, Promise.resolve([]));
  
  return {
    name: tv.name,
    original_name: season.name,
    genres: await normalizeGenre(await tv.getGenres()),
    season_number: season.season_number,
    number_of_episodes: tv.number_of_episodes,
    poster_path: season.poster_path,
    overview: season.overview || tv.overview,
    files_count: files.length, 
    run_time: (runtimes && runtimes.length > 0 ? runtimes[0] : null),
    episodes: episodes.map((episode) => {
      return {
        id: episode.id,
        name: episode.name,
        episode_number: episode.episode_number,
      };
    }),
    files: await normalizeFile(files),
    updated_at: season.updated_at,
    created_at: season.created_at
  };
}

module.exports = {
  index: async function(season) {
    const body = await normalize(season);
    return es.index({
      index: this.definition.index,
      type: 'season',
      id: season.id,
      body
    });
  },
  normalize,
  properties: {
    name: { type: 'text' },
    original_name: { type: 'text' },
    genres: {
      type: 'nested',
      dynamic: false,
      properties: genreProperties
    },
    season_number: { type: 'short' },
    number_of_episodes: { type: 'short' },
    overview: { type: 'text' },
    files_count: { type: 'short' },
    run_time: { type: 'short' },
    episodes: {
      type: 'nested',
      dynamic: false,
      properties: {
        name: { type: 'text' },
        episode_id: { type: 'short' }
      }
    },
    files: {
      type: 'nested',
      dynamic: false,
      properties: fileProperties
    },
    created_at: { type: 'date' },
    updated_at: { type: 'date' }
  }
};