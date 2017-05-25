const es = require('../../elastic.js');
const { normalize: normalizeFile, properties: fileProperties } = require('./file.js');
const { normalize: normalizeGenre, properties: genreProperties } = require('./genre.js');

async function normalize(episode) {
  const files = await episode.getFiles();
  const season = await episode.getSeason();
  const tv = await season.getTv();
  const runtimes = tv.episode_run_time;

  let runtime = null;
  if (runtimes && runtimes.length > 0) {
    if (runtimes > episode.episode_number) {
      runtime = runtimes[episode.episode_number];
    } else {
      runtime = runtime[0];
    }
  }

  return {
    id: episode.id,
    original_name: episode.name,
    name: tv.name,
    genres: await normalizeGenre(await tv.getGenres()),
    episode_number: episode.episode_number,
    season_number: season.season_number,
    poster_path: episode.still_path,
    overview: tv.overview || season.overview || tv.overview,
    vote_average: episode.vote_average,
    files_count: files.length,
    run_time: runtime,
    files: await normalizeFile(files),
    updated_at: episode.updated_at,
    created_at: episode.created_at
  };
}

module.exports = {
  index: async function(episode) {
    const body = await normalize(episode);
    return es.index({
      index: this.definition.index,
      type: 'episode',
      id: episode.id,
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
    episode_number: { type: 'short' },
    season_number: { type: 'short' },
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