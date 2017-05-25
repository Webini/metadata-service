const { sequelize } = require('../models/index.js');

function flattenResults(results) {
  if (results.length <= 0) {
    return 0;
  } else {
    return results[0].nb;
  }
}

module.exports = {
  tv: async (tvId) => {
    return flattenResults(await sequelize.query(`
      SELECT
        COUNT(DISTINCT f.id) as nb
      FROM Tv t
      INNER JOIN Season s ON s.tv_id = t.id
      INNER JOIN Episode e ON e.season_id = s.id
      INNER JOIN File f ON f.episode_id = e.id
      WHERE t.id = :tv_id`,
      { 
        replacements: { 
          tv_id: tvId
        }, 
        type: sequelize.QueryTypes.SELECT 
      }
    ));
  },
  season: async (seasonId) => {
    return flattenResults(await sequelize.query(`
      SELECT
        COUNT(DISTINCT f.id) as nb
      FROM Season s
      INNER JOIN Episode e ON e.season_id = s.id
      INNER JOIN File f ON f.episode_id = e.id
      WHERE s.id = :season_id`,
      { 
        replacements: { 
          season_id: seasonId
        }, 
        type: sequelize.QueryTypes.SELECT 
      }
    ));
  },
  movie: async (movieId) => {
    return flattenResults(await sequelize.query(`
      SELECT
        COUNT(DISTINCT f.id) as nb
      FROM Movie m
      INNER JOIN File f ON f.movie_id = m.id
      WHERE m.id = :movie_id`,
      { 
        replacements: { 
          movie_id: movieId
        }, 
        type: sequelize.QueryTypes.SELECT 
      }
    ));
  }
};