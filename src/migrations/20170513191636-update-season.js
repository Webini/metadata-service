'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('Season', 'tv_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Tv',
        key: 'id'
      },
      onDelete: 'cascade'
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Season', 'tv_id');
  }
};
