'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('TvKeyword', {
      tv_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tv',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      keyword_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Keyword',
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
    return queryInterface.dropTable('TvKeyword');
  }
};