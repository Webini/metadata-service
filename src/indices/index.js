'use strict';

const fs        = require('fs');
const path      = require('path');
const basename  = path.basename(module.filename);
const indices   = {};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const index = require(path.join(__dirname, file));
    indices[index.index] = index;
  })
;

module.exports = indices;
