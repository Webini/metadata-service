'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('TvGenre', {
      tv_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tv',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      genre_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Genre',
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
    return queryInterface.dropTable('TvGenre');
  }
};