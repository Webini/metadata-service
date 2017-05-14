const MediaTagger = require('./taggers/media.js');
const videos = [
  '3g2', '3gp', '3gp2', 'asf', 'avi', 'divx', 'flv', 'm4v', 'mk2',
  'mka', 'mkv', 'mov', 'mp4', 'mp4a', 'mpeg', 'mpg', 'ogg', 'ogm',
  'ogv', 'qt', 'ra', 'ram', 'rm', 'ts', 'wav', 'webm', 'wma', 'wmv',
  'iso', 'vob' 
];

/**
 * @param {string} extension
 * @returns {MediaTagger} 
 */
module.exports = (extension) => {
  extension = extension.toLowerCase();

  if (videos.includes(extension)) {
    return MediaTagger;
  }

  //@todo tagger for ebook, music
  
  return null;
};