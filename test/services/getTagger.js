const getTagger = require('../../src/services/getTagger.js');
const MediaTagger = require('../../src/services/taggers/media.js');
const assert = require('assert');

describe('getTagger', () => {
  it('should return MediaTagger for videos', () => {
    const extensions = [
      '3g2', '3gp', '3gp2', 'asf', 'avi', 'divx', 'flv', 'm4v', 'mk2',
      'mka', 'mkv', 'mov', 'mp4', 'mp4a', 'mpeg', 'mpg', 'ogg', 'ogm',
      'ogv', 'qt', 'ra', 'ram', 'rm', 'ts', 'wav', 'webm', 'wma', 'wmv',
      'iso', 'vob' 
    ];

    extensions.forEach((ext) => {
      assert.ok(getTagger(ext) === MediaTagger, 'Invalid tagger');
    });
  });
});