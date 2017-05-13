'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const winston   = require('winston');
const basename  = path.basename(module.filename);
const db        = {};

db.conf = {
  database: process.env.DATABASE, 
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialect: process.env.DATABASE_DIALECT || 'mariadb',
  logging: !!parseInt(process.env.DATABASE_LOGGING || 0),
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 3306,
  storage: process.env.DATABASE_STORAGE,
  underscored: true,
  define: {
  underscored: true,
    freezeTableName: true, 
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }
};

const sequelize = new Sequelize(
  db.conf.database, 
  db.conf.user,
  db.conf.password,
  db.conf
);

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
