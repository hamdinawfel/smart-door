const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateChangePwdInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.currentPassword = !isEmpty(data.currentPassword) ? data.currentPassword : "";
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

// Password checks
  // Password checks
  if (Validator.isEmpty(data.currentPassword)) {
    errors.password = "Current password field is required";
  }
  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = "New password field is required";
  }
if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is required";
  }
if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.newPassword, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};