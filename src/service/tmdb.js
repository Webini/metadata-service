const Promise      = require('bluebird');
const Moviedb      = require('moviedb');

const ignoredMethods = [ 'requestToken', 'session' ];
const retryDelay     = process.env.TMDB_DEFAULT_RETRY_DELAY || 20;
const killAfter      = process.env.TMDB_KILL_RETRY_AFTER || 40;
let   killSwitch     = killAfter;

function create(apiKey) {
  const inst = Promise.promisifyAll(new Moviedb(apiKey));
  const newInst = {};
  
  // overload to automatically retry after
  Object.keys(inst).forEach((method) => {
    if (ignoredMethods.indexOf(method) !== -1 || !/Async$/.test(method)) {
      if (typeof newInst === 'function') {
        newInst[method] = function() {
          return inst[method].apply(inst, arguments);
        };
      } else {
        newInst[method] = inst[method];
      }
      return;
    }

    newInst[method] = function() {
      return inst[method]
              .apply(inst, arguments)
              .then((data) => {
                killSwitch = killAfter;
                return data;
              })
              .catch((e) => {
                killSwitch--;

                if (killSwitch > 0 && e.status === 429 && e.response) {
                  const retryAfter = parseInt(e.response.headers['retry-after'] || retryDelay);

                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      resolve(newInst[method].apply(newInst, arguments));
                    }, (retryAfter+0.5) * 1000); //+0.5 if server return retry-after: 0
                  });
                }

                throw e;
              });
    };
  });
  return newInst;
}

const instance = create(process.env.TMDB_API_KEY);

instance.create = create;

module.exports = instance;