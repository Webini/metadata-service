const models = require('../../src/models/index.js');

module.exports = function emptyDb() {
  return Object
    .keys(models)
    .filter((name) => (name !== 'conf' && name.toLowerCase() !== 'sequelize'))
    .reduce(async (promise, modelName) => {
      await promise;
      return models[modelName].destroy({ cascade: true, where: {} });
    }, Promise.resolve())
  ;
};