module.exports = async () => {
  const fs = require('fs');
  const ProgressBar = require('progress');
  const models = require('../models/index.js');
  const output = [];
  const priorities = {
    Tv:      1,
    Movie:   1,
    Genre:   1,
    Image:   1,
    Keyword: 1,
    Person:  1,
    ProductionCompany: 1,
    Video:   1,
    Season: 2,
    Episode: 3,
    File: 4
  };
  
  await Object
    .keys(models)
    .filter((name) => (name !== 'conf' && name.toLowerCase() !== 'sequelize'))
    .sort((a, b) => {
      const aWeight = priorities[a] || 999;
      const bWeight = priorities[b] || 999;
      return aWeight - bWeight;
    })
    .reduce(async (promise, name) => {
      await promise;
      const model = models[name];
      console.log(`Fetching ${name}\'s data`);

      const data = await model.findAll();
      const progress = new ProgressBar(':bar :current / :total', { 
        total: data.length,
        width: 128 
      });

      if (!data || data.length <= 0) {
        return;
      }

      data.forEach((element) => {
        progress.tick();
        output.push({
          model: name,
          data: element.toJSON()
        });
      });
    }, Promise.resolve())
    .then(() => {
      fs.writeFileSync(process.argv[3] || 'dump.json', JSON.stringify(output));
      console.log('Finished');
      process.exit();
    })
  ;
};