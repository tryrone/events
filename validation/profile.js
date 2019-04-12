const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is Required";
  }

  if (validator.isEmpty(data.bio)) {
    errors.bio = "Bio is Required";
  }
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Please enter a valid Url";
    }
  }
  if (!isEmpty(data.blog)) {
    if (!validator.isURL(data.blog)) {
      errors.blog = "Please enter a valid Url";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Please enter a valid Url";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Please enter a valid Url";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Please enter a valid Url";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Please enter a valid Url";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
