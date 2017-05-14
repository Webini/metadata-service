'use strict';
module.exports = function(sequelize, DataTypes) {
  const File = sequelize.define('File', {
    torrent: DataTypes.STRING(40),
    basename: DataTypes.STRING(1024),
    extension: DataTypes.STRING(128),
    directory:  DataTypes.STRING(4096),
    length: DataTypes.BIGINT.UNSIGNED,
    type: DataTypes.INTEGER.UNSIGNED
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return File;
};