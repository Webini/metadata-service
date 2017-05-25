const commands = [
  'serie',
  'movie',
  'all',
];

function getNextOffset(current, elements) {
  for (let i = 0, sz = elements.length; i < sz; i++) {
    if (elements[i].index > current) {
      return elements[i].index;
    }
  }
  return null;
}

function explode(str) {
  const tocut = [];

  const words = commands.join('|');
  const reg = new RegExp(`(${words})\\s*:\\s*`, 'igm');

  let result = null;
  while ((result = reg.exec(str)) !== null) {
    tocut.push({
      index: result.index,
      name: result[1],
      original: result[0]
    });
  }

  const extracted = [];
  let decal = 0;
  tocut.forEach((command) => {
    const start = command.index - decal;
    let end = getNextOffset(command.index, tocut);
    if (end === null) {
      end = str.length;
    } else {
      end -= decal;
    }

    const part = str.substr(start, end - start);
    str = str.substr(0, start) + str.substr(end);
    decal += part.length;

    extracted.push({
      name: command.name,
      query: part.substr(command.original.length).trim()
    });
  });

  extracted.push({
    name: 'all',
    query: str.trim()
  });

  return extracted.filter((el) => el.query.length);
}

function extractTvNumbers(str) {
  let seasonNumber = null;
  let episodeNumber = null;
  //ep number must be preceded by a non alpha char, 0-9 or the beginning of the str 
  str = str.replace(/((?:[^\w]|[0-9]{1,2}|^))e([0-9]{1,2})/img, (match, start, episode) => {
    episodeNumber = parseInt(episode);
    return start;
  });

  str = str.replace(/((?:[^\w]|[0-9]{1,2}|^))s([0-9]{1,2})/img, (match, start, season) => {
    seasonNumber = parseInt(season);
    return start;
  });

  const result = { query: str.trim() };

  if (seasonNumber && !isNaN(seasonNumber)) {
    result.season_number = seasonNumber;
  }

  if (episodeNumber && !isNaN(episodeNumber)) {
    result.episode_number = episodeNumber;
  }

  return result;
}

module.exports = function(str) {
  const commands = explode(str);

  return commands.map((command) => {
    if (command.name !== 'all' && command.name !== 'serie') {
      return command;
    }

    const numbers = extractTvNumbers(command.query);
    return Object.assign(command, numbers);
  });  
};

module.exports.explode = explode;
module.exports.tvNumbers = extractTvNumbers;