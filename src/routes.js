const apiConstraints     = require('./middlewares/apiConstraints.js');
const searchCtrl         = require('./controllers/search.js');
const filenameCtrl       = require('./controllers/filename.js');

module.exports = (app) => {
  app.post('/search', 
    apiConstraints(searchCtrl.LOG_PREFIX, searchCtrl.searchConstraints), 
    searchCtrl.search
  );

  app.post('/filename', 
    apiConstraints(filenameCtrl.LOG_PREFIX, filenameCtrl.parseConstraints),
    filenameCtrl.parse
  );
  
  //app.delete('/:hash([a-zA-Z0-9]{40})', torrent.remove);
};
