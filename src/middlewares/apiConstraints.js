const validate = require('validate.js');

module.exports = (loggerPrefix, constraints) => {
  return function(req, res, next) {
    const errors = validate(req.body, constraints);
    
    if (errors) {
      return res.apiError(loggerPrefix, errors, 'Invalid user input', 400);
    }

    next();
  };
}; 