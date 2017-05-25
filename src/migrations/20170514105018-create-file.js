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
      title: {
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
      episode_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Episode',
          key: 'id',
        },
        onDelete: 'SET NULL'
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Movie',
          key: 'id',
        },
        onDelete: 'SET NULL'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
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