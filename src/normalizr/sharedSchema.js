const normalizr = require('normalizr');
const crypto = require('crypto');
const schema = normalizr.schema;

const processImage = (value) => {
  const hash = crypto.createHash('md5');
  hash.update(value.file_path);
  return Object.assign({ id: hash.digest('hex') }, value);
};

const processImageId = (val) => {
  return processImage(val).id;
};

module.exports = {
  genre: new schema.Entity('genres'),
  productionCompany: new schema.Entity('production_companies'),
  country: new schema.Entity('countries', {}, { idAttribute: 'iso_3166_1' }),
  language: new schema.Entity('languages', {}, { idAttribute: 'iso_639_1' }),
  video: new schema.Entity('videos'),
  cast: new schema.Entity('cast'),
  crew: new schema.Entity('crew'),
  network: new schema.Entity('networks'),
  image: new schema.Entity('images', {}, { idAttribute: processImageId, processStrategy: processImage }),
  keyword: new schema.Entity('keywords')
};