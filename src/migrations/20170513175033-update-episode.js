'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('Episode', 'season_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Season',
        key: 'id'
      },
      onDelete: 'cascade'
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Episode', 'season_id');
  }
};
