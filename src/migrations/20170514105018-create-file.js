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
      torrent: {
        type: Sequelize.STRING(40),
        allowNull: false
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
      directory: {
        type: Sequelize.STRING(4096),
        allowNull: true
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
    }).then(() => {
      return queryInterface.addIndex('File', ['torrent'], { indexName: 'torrent_torrent_idx' });  
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface
      .dropTable('File')
      .then(() => {
        return queryInterface.removeIndex('File', 'file_type_idx'); 
      })
      .then(() => {
        return queryInterface.removeIndex('File', 'torrent_torrent_idx'); 
      });
  }
};