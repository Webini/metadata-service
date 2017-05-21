const { sequelize } = require('../models/index.js');

module.exports = async (tvId, seasonNumber, episodeNumber) => {
  const results = await sequelize.query(`
    SELECT 
      t.id as tv_id,
      s.id as season_id,
      e.id as episode_id 
    FROM Tv t
    LEFT JOIN Season s ON s.tv_id = t.id AND s.season_number = :season_number
    LEFT JOIN Episode e ON e.season_id = s.id AND e.episode_number = :episode_number
    WHERE t.id = :tv_id
    LIMIT 1`,
    { 
      replacements: { 
        tv_id: tvId,
        season_number: seasonNumber,
        episode_number: episodeNumber 
      }, 
      type: sequelize.QueryTypes.SELECT 
    }
  );

  if (results.length <= 0) {
    return null;
  } else {
    return results[0];
  }
};