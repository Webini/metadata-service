const es = require('../../elastic.js');

async function normalize(file) {
  if (file instanceof Array) {
    return Promise.all(file.map((f) => {
      return normalize(f);
    }));
  }
  
  return {
    id: file.id,
    name: file.title,
    original_name: file.basename,
    length: file.length,
    updated_at: file.updated_at,
    created_at: file.created_at,
    files_count: 1,
  };
}

module.exports = {
  index: async function(file) {
    const body = await normalize(file);
    return es.index({
      index: this.definition.index,
      type: 'file',
      id: file.id,
      body
    });
  },
  normalize,
  properties: {
    id: { type: 'string' },
    name: { type: 'text' },
    original_name: { type: 'text' },
    files_count: { type: 'short' },
    created_at: { type: 'date' },
    updated_at: { type: 'date' }
  }
};