const findTvEpisodeId = require('../queries/findTvEpisodeId.js');
const { File, Movie } = require('../models/index.js');
const movieNormalizr  = require('../normalizr/movie.js');
const tvNormalizr     = require('../normalizr/tv.js');
const identify        = require('./identify.js');
const updater         = require('../updater/updater.js');
const Raven           = require('../raven.js');
const tmdb            = require('tmdb-graphql');

module.exports = {
  /**
   * Update metadata associated with the entity @file
   * This method don't persist modification of the @file entity
   * 
   * @param {File} file 
   * @returns {File}
   */
  assign: async function(file) {
    const filedata = await identify(file.basename);
    
    if (filedata.type === File.TYPES.tv) {
      await this.assignTv(file, filedata.tv.id, filedata.season, filedata.episode);
    } else if (filedata.type === File.TYPES.movie) {
      await this.assignMovie(file, filedata.movie.id);
    }

    file.title = filedata.title;
    return file;
  },

  /**
   * Update metadata and assign it to the entity @file
   * This method don't persist modification of the @file entity
   * 
   * @param {File} file 
   * @param {number} movieId 
   * @returns {File}
   */
  assignMovie: async function(file, movieId) {
    let movie = await Movie.findOne({ where : { id: movieId } });
    try {
      if (movie === null) {
        const movieData = await tmdb.getMovie(movieId);
        const normalized = movieNormalizr(movieData);
        await updater(normalized.entities);
        movie = await Movie.findOne({ where : { id: movieId } });
      }
    } catch(e) {
      await new Promise((resolve) => {
        Raven.captureException(e, { 
          extra: { 
            movie_id: movieId, 
            file_id: (file ? file.id : null) 
          },
          level: 'warning'
        }, () => resolve());
      });
    }

    if (movie !== null) {
      file.movie_id = movie.id;
      file.type = File.TYPES.movie;
    } else {
      file.type = File.TYPES.unknownMedia;
    }

    return file;
  },
  
  /**
   * Update metadata and assign it to the entity @file
   * This method don't persist modification of the @file entity
   * 
   * @param {File} file 
   * @param {number} tvId 
   * @param {number} seasonNumber 
   * @param {number} episodeNumber 
   * @returns {File}
   */
  assignTv: async function(file, tvId, seasonNumber, episodeNumber) {
    let ids = await findTvEpisodeId(tvId, seasonNumber, episodeNumber);
    try {
      if (!ids || !ids.season_id || !ids.episode_id) {
        const tvData = await tmdb.getTv(tvId);
        const normalized = tvNormalizr(tvData);
        await updater(normalized.entities);
        ids = await findTvEpisodeId(tvId, seasonNumber, episodeNumber);
      }
    } catch(e) {
      await new Promise((resolve) => {
        Raven.captureException(e, { 
          extra: { 
            tv_id: tvId, 
            season_number: seasonNumber, 
            episode_number: episodeNumber, 
            file_id: (file ? file.id : null) 
          },
          level: 'warning'
        }, () => resolve());
      });
    }

    if (ids && ids.season_id && ids.episode_id) {
      file.episode_id = ids.episode_id;
      file.type = File.TYPES.tv;
    } else {
      file.type = File.TYPES.unknownMedia;
    }

    return file;
  }
};