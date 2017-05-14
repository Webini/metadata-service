const onLoaded = require('../../server.js');
const assert = require('assert');
const models = require('../../src/models/index.js');

describe('Video schema', () => {
  const { Video } = models;

  before(() => {
    return onLoaded;
  });

  afterEach(async () => {
    //no trucate cascade available
    await Video.destroy({ cascade: true, where: { id: { $ne: 0 } } });
  });
  
  it('should conserve same id', async () => {
    const id = '58ba57ac925141608401976f';
    const video = await Video.create({ id, name: 'lala' });
    
    assert.strictEqual(id, video.id);
  });
});