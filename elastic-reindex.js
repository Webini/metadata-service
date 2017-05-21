require('dotenv').config();
const Raven         = require('./src/raven.js');
const elasticsearch = require('./src/elastic.js');
const indices       = require('./src/indices/index.js');

(async () => { 
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
})().catch((e) => {
  console.log(e);
});