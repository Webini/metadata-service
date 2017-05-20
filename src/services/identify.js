const guessit = require('guessit-exec');
const path = require('path');
const getMediaData = require('./identifiers/media.js');
const db = require('../models/index.js');
const videos = [
  '3g2', '3gp', '3gp2', 'asf', 'avi', 'divx', 'flv', 'm4v', 'mk2',
  'mka', 'mkv', 'mov', 'mp4', 'mp4a', 'mpeg', 'mpg', 'ogg', 'ogm',
  'ogv', 'qt', 'ra', 'ram', 'rm', 'ts', 'wav', 'webm', 'wma', 'wmv',
  'iso', 'vob' 
];

/**
 * @param {basename} basename
 * @returns {MediaTagger} 
 */
module.exports = async (basename) => {
  const extension = path.extname(basename).substr(1).toLowerCase();
  const filedata = await guessit(basename);
  
  if (videos.includes(extension)) {
    return getMediaData(filedata);
  } else {
    filedata.type = db.File.TYPES.unknown;
  }

  //@todo tagger for ebook, music
  
  return filedata;
};