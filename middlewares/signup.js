const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateSignupInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Veuillez remplir ce champ";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email ="Veuillez remplir ce champ";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Veuillez entrer une adresse email valide";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Veuillez remplir ce champ";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Weak Password";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};