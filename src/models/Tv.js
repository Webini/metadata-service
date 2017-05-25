function setJsonData(model, field, data) {
  model.setDataValue(field, JSON.stringify(data));
}

function getJsonData(model, field) {
  const data = model.getDataValue(field);
  
  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

module.exports = function(sequelize, DataTypes) {
  const Tv = sequelize.define('Tv', {
    backdrop_path: DataTypes.STRING,
    first_air_date: DataTypes.DATE,
    homepage: DataTypes.STRING,
    name: DataTypes.STRING,
    number_of_episodes: DataTypes.INTEGER,
    number_of_seasons: DataTypes.INTEGER,
    original_language: DataTypes.STRING,
    original_name: DataTypes.STRING,
    overview: DataTypes.TEXT,
    popularity: DataTypes.FLOAT,
    poster_path: DataTypes.STRING,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    vote_average: DataTypes.FLOAT,
    vote_count: DataTypes.INTEGER,
    external_ids_json: DataTypes.STRING,
    episode_run_time_json: DataTypes.STRING,
    networks_json: DataTypes.STRING,
    origin_country_json: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Tv.belongsToMany(models.Genre, {
          through: {
            model: models.TvGenre
          },
          foreignKey: 'tv_id',
          otherKey: 'genre_id'
        });

        Tv.belongsToMany(models.Video, {
          through: {
            model: models.TvVideo
          },
          foreignKey: 'tv_id',
          otherKey: 'video_id'
        });

        Tv.hasMany(models.TvCast, {
          foreignKey: 'tv_id',
          as: 'Cast'
        });

        Tv.hasMany(models.TvCrew, {
          foreignKey: 'tv_id',
          as: 'Crew'
        });

        Tv.belongsToMany(models.Image, {
          through: {
            model: models.TvBackdrop
          },
          foreignKey: 'tv_id',
          otherKey: 'image_id',
          as: 'Backdrops'
        });

        Tv.belongsToMany(models.Image, {
          through: {
            model: models.TvPoster
          },
          foreignKey: 'tv_id',
          otherKey: 'image_id',
          as: 'Posters'
        });

        Tv.belongsToMany(models.Keyword, {
          through: {
            model: models.TvKeyword
          },
          foreignKey: 'tv_id',
          otherKey: 'keyword_id'
        });

        Tv.hasMany(models.Season, { foreignKey: 'tv_id' });
      }
    },
    getterMethods: {
      external_ids:     function() { return getJsonData(this, 'external_ids_json'); },
      networks:         function() { return getJsonData(this, 'networks_json'); },
      episode_run_time: function() { return getJsonData(this, 'episode_run_time_json'); },
      origin_country:   function() { return getJsonData(this, 'origin_country_json'); }
    },
    setterMethods: {
      external_ids:     function(value) { setJsonData(this, 'external_ids_json', value); },
      networks:         function(value) { setJsonData(this, 'networks_json', value); },
      episode_run_time: function(value) { setJsonData(this, 'episode_run_time_json', value); },
      origin_country:   function(value) { setJsonData(this, 'origin_country_json', value); }
    }
  });
  return Tv;
};