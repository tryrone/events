const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";

  const errors = {};

  if (!validator.isEmail(data.email)) {
    errors.email = "Please use a valid email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required ";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
