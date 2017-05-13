'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('TvCrew', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(24),
      },
      tv_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tv',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      person_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Person',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      job: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('TvCrew');
  }
};