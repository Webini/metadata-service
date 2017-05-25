module.exports = async function() {
  const elasticsearch = require('../elastic.js');
  const indices       = require('../indices/index.js');

  await Promise.all(
    Object
      .keys(indices)
      .map(async (name) => {
        const definition = indices[name].definition;
        console.log(`Recreating index ${definition.index}`);
        if (await elasticsearch.indices.exists({ index: definition.index })) {
          await elasticsearch.indices.close({ index: definition.index });
          await elasticsearch.indices.delete({ index: definition.index });
        } 
        await elasticsearch.indices.create(definition);
      })
  );
};