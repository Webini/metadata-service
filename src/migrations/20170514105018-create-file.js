'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('File', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.STRING(36)
      },
      basename: {
        type: Sequelize.STRING(1024)
      },
      extension: {
        type: Sequelize.STRING(128)
      },
      length: {
        type: Sequelize.BIGINT.UNSIGNED
      },
      type: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      return queryInterface.addIndex('File', ['type'], { indexName: 'file_type_idx' });
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface
      .dropTable('File')
      .then(() => {
        return queryInterface.removeIndex('File', 'file_type_idx'); 
      })
    ;
  }
};