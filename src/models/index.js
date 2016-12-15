const fs        = require('fs');
const path      = require('path');
const mongoose  = require('mongoose');
const basename  = path.basename(module.filename);
const db        = {};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });

db.mongoose = mongoose;

mongoose.connect(process.env.MONGO_URL);

module.exports = db;
