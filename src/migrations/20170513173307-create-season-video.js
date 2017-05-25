'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('SeasonVideo', {
      season_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Season',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      video_id: {
        type: Sequelize.STRING(24),
        allowNull: false,
        references: {
          model: 'Video',
          key: 'id'
        },
        onDelete: 'cascade'
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('SeasonVideo');
  }
};