const _get = require('lodash.get');
const defaultDef = require('./definition.json');
const db = require('../models/index.js');

/**
 * @param {Sequelize.Model} model 
 * @param {Object} data 
 * @returns {Promise}
 */
async function upsert(model, data) {
  await model.upsert(data);

  if (data.id) {
    return await model.findOne({ where: { id: data.id }});
  } else {
    return await model.findOne({ where: data });
  }
}

/**
 * @param {Object} conf 
 * @param {Object} entityData 
 * @param {Object} rootData 
 * @returns {Sequelize.Model[]}
 */
async function processEntity(conf, entityData, rootData) {
  const model = db[conf.entity];

  const entities = await Promise.all(
    Object
      .keys(entityData)
      .map((key) => upsert(model, entityData[key]))
  );

  if (!conf.relations) {
    return entities;
  }

  await Promise.all(entities.map((entity) => {
    return Object
      .keys(conf.relations)
      .reduce(async (promise, path) => {
        await promise;
        const relation = conf.relations[path];
        const relationData = _get(entityData[entity.id], path);
        return processRelations(
          conf.relationColumn, 
          conf.idColumn,
          entity,
          relation,
          relationData,
          rootData
        );
      }, Promise.resolve())
    ;
  }));

  return entities;
}

/**
 * @param {string} parentRelationColumn 
 * @param {null|string} parentIdColumn 
 * @param {Sequelize.Model} parentEntity 
 * @param {Object} relation 
 * @param {Object} relationData 
 * @param {Object} rootData 
 * @returns {Array}
 * @todo if necessary a day, handle oneToOne
 */
async function processRelations(parentRelationColumn, parentIdColumn, parentEntity, relation, relationData, rootData) {
  //if we have a more complicated relationship than a many to many let's go recursive
  if (relation.normalizrEntity) {
    return await Promise.all(relationData.map(async (id) => {
      const entityData = rootData[relation.normalizrEntity][id];

      return (await processEntity(
        relation, 
        [ Object.assign({ 
          [parentRelationColumn]: parentEntity[parentIdColumn || 'id'] 
        }, entityData) ], 
        rootData
      ))[0]; 
    }));
  } else {
    //if we have a many to many
    const model = db[relation.entity];

    return Promise.all(relationData.map(async (id) => {
      return await upsert(model, {
        [parentRelationColumn]: parentEntity[parentIdColumn || 'id'],
        [relation.column]: id
      });
    }));
  }
}

module.exports = async (rootData, definition = defaultDef) => {
  const results = [];
  return Object
    .keys(definition)
    .filter((key) => {
      return !!(rootData[key]);
    })
    .sort((a, b) => definition[a].priority - definition[b].priority)
    .reduce(async (promise, key) => {
      await promise;
      const result = processEntity(definition[key], rootData[key], rootData);
      results.push(result);
      return result;
    }, Promise.resolve())
    .then(() => Promise.all(results));
};