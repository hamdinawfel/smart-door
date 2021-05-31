const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateResetPwdInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

// Password checks
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Veuillez remplir ce champ";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Veuillez remplir ce champ";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Weak Password";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};