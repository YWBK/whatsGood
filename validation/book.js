const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCreateBookInput(data) {
  let errors = {};

  data.volumeId = validText(data.volumeId) ? data.volumeId : '';
  data.description = validText(data.description) ? data.description : '';
  data.userId = validText(data.userId) ? data.userId : '';
  data.listId = validText(data.listId) ? data.listId : '';

  if (Validator.isEmpty(data.volumeId)) {
    errors.volumeId = 'volumeId field is required';
  }

  if (Validator.isEmpty(data.userId)) {
    errors.userId = 'userId field is required';
  }

  if (Validator.isEmpty(data.listId)) {
    errors.listId = 'listId field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};