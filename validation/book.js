const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCreateBookInput(data) {
  let errors = {};

  data.volumeId = validText(data.volumeId) ? data.volumeId : '';
  data.description = validText(data.description) ? data.description : '';

  if (Validator.isEmpty(data.volumeId)) {
    errors.volumeId = 'volumeId field is required';
  }


  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};