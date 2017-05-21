module.exports = async function() {
  const Umzug   = require('umzug');
  const path    = require('path');
  const models  = require('../models/index.js'); 

  const umzug   = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: models.sequelize
    },
    migrations: {
      params: [ models.sequelize.getQueryInterface(), models.Sequelize ],
      path: path.join(__dirname, '../migrations') 
    }
  });

  const migrations = await umzug.up();
  
  if (migrations.length <= 0) {
    console.log('Your db is up to date');
  } else {
    migrations.forEach((migration) => {
      console.log(`Migration ${migration.file} done.`);
    });
  }
};