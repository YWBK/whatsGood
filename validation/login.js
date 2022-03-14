const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
  let errors = {};
  let isEmail = true;
  data.emailOrUsername = validText(data.emailOrUsername) ? data.emailOrUsername : '';
  data.password = validText(data.password) ? data.password : '';

  if (!Validator.isEmail(data.emailOrUsername)) {
    isEmail = false;
  }

  if (Validator.isEmpty(data.emailOrUsername)) {
    errors.emailOrUsername = 'Email or username is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isEmail,
    isValid: Object.keys(errors).length === 0
  };
};