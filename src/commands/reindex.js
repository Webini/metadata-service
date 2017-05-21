module.exports = async function() {
  const elasticsearch = require('../elastic.js');
  const indices       = require('../indices/index.js');

  await Promise.all(
    Object
      .keys(indices)
      .map(async (indexName) => {
        console.log(`Recreating index ${indexName}`);
        if (await elasticsearch.indices.exists({ index: indexName })) {
          await elasticsearch.indices.close({ index: indexName });
          await elasticsearch.indices.delete({ index: indexName });
        } 
        await elasticsearch.indices.create(indices[indexName]);
      })
  );
};