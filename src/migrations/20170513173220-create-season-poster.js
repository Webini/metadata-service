'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('SeasonPoster', {
      season_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Season',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      image_id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        references: {
          model: 'Image',
          key: 'id'
        },
        onDelete: 'cascade'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('SeasonPoster');
  }
};