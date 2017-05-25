const es = require('../elastic.js');
const { File } = require('../models/index.js');
const countFilesFor = require('../queries/countFilesFor.js');

function mapFiles(files) {
  return files.map((file) => {
    return prepareFileObject(file);
  });
}

function mapGenres(genres) {
  return genres.map((genre) => {
    return {
      name: genre.name,
      id: genre.id
    };
  });
}

async function prepareFileObject(file) {
  return {
    id: file.id,
    name: file.title,
    original_name: file.basename,
    length: file.length
  };
}

async function indexFile(file) {
  const body = await prepareFileObject(file);
  return es.index({
    index: this.definition.index,
    type: 'file',
    id: file.id,
    body
  });
}

async function prepareMovieObject(movie) {
  return {
    id: movie.id,
    name: movie.title,
    genres: mapGenres(await movie.getGenres()),
    original_name: movie.original_title,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    overview: movie.overview,
    vote_average: movie.vote_average,
    files_count: await countFilesFor.movie(movie.id),
    run_time: movie.runtime,
    files: mapFiles(await movie.getFiles())
  };
}

async function indexMovie(movie) {
  const body = await prepareMovieObject(movie);
  return es.index({
    index: this.definition.index,
    type: 'movie',
    id: movie.id,
    body
  });
}

async function prepareEpisodeObject(episode) {
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
    name: episode.name,
    genres: mapGenres(await tv.getGenres()),
    episode_number: episode.episode_number,
    poster_path: episode.still_path,
    overview: tv.overview || season.overview || tv.overview,
    vote_average: episode.vote_average,
    files_count: files.length,
    run_time: runtime,
    files: mapFiles(files)
  };
}

async function indexEpisode(episode) {
  const body = await prepareEpisodeObject(episode);
  return es.index({
    index: this.definition.index,
    type: 'episode',
    id: episode.id,
    body
  });
}

async function prepareSeasonObject(season) {
  const tv = await season.getTv();
  const episodes = await season.getEpisodes({ 
    include: [ { model: File, required: true } ] 
  });
  const runtimes = tv.episode_run_time;
  const files = await episodes.reduces(async (promise, episode) => {
    const result = await promise;
    const files = await episode.getFiles();
    return result.concat(files);
  }, Promise.resolve([]));

  return {
    name: season.name,
    genres: mapGenres(await tv.getGenres()),
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
    files: mapFiles(files)
  };
}

async function indexSeason(season) {
  const body = await prepareSeasonObject(season);
  return es.index({
    index: this.definition.index,
    type: 'season',
    id: season.id,
    body
  });
}

async function prepareTvObject(tv) {
  const runtimes = tv.episode_run_time;
  return {
    name: tv.name,
    genres: mapGenres(await tv.getGenres()),
    original_name: tv.original_name,
    number_of_episodes: tv.number_of_episodes,
    number_of_seasons: tv.number_of_seasons,
    poster_path: tv.poster_path,
    backdrop_path: tv.backdrop_path,
    overview: tv.overview,
    vote_average: tv.vote_average,
    files_count: await countFilesFor.tv(tv.id),
    run_time: (runtimes && runtimes.length > 0 ? runtimes[0] : null)
  };
}

async function indexTv(tv) {
  const body = await prepareTvObject(tv);
  return es.index({
    index: this.definition.index,
    type: 'tv',
    id: tv.id,
    body
  });
}


const genresDefinition = {
  type: 'object',
  dynamic: false,
  properties: {
    name: { type: 'text' }
  }
};

const filesDefinition = {
  type: 'object',
  dynamic: false,
  properties: {
    name: { type: 'text' },
    original_name: { type: 'text' }
  }
};

module.exports = {
  definition: {
    index: 'search',
    body: {
      mappings: {
        file: {
          _all: { enabled: false },
          properties: {
            name: { type: 'text' },
            original_name: { type: 'text' }
          }
        },
        movie: {
          _all: { enabled: false },
          properties: {
            name: { type: 'text' },
            genres: genresDefinition,
            original_name: { type: 'text' },
            overview: { type: 'text' },
            vote_average: { type: 'float' },
            files_count: { type: 'short' },
            run_time: { type: 'short' },
            files: filesDefinition
          }
        },
        episode: {
          _all: { enabled: false },
          properties: {
            name: { type: 'text' },
            genres: genresDefinition,
            episode_number: { type: 'short' },
            overview: { type: 'text' },
            vote_average: { type: 'float' },
            files_count: { type: 'short' },
            run_time: { type: 'short' },
            files: filesDefinition
          }
        },
        season: {
          _all: { enabled: false },
          properties: {
            name: { type: 'text' },
            genres: genresDefinition,
            season_number: { type: 'short' },
            number_of_episodes: { type: 'short' },
            overview: { type: 'text' },
            files_count: { type: 'short' },
            run_time: { type: 'short' },
            episode: {
              type: 'object',
              dynamic: false,
              properties: {
                name: { type: 'text' }
              }
            }
          }
        },
        tv: {
          _all: { enabled: false },
          properties: {
            name: { type: 'text' },
            genres: genresDefinition,
            original_name: { type: 'text' },
            number_of_episodes: { type: 'short' },
            number_of_seasons: { type: 'short' },
            overview: { type: 'text' },
            vote_average: { type: 'float' },
            files_count: { type: 'short' },
            run_time: { type: 'short' }
          }
        }
      }
    }
  },
  indexFile,
  indexMovie,
  indexEpisode,
  indexSeason,
  indexTv
};