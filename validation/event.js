const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEventInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.starts = !isEmpty(data.starts) ? data.starts : "";
  data.ends = !isEmpty(data.ends) ? data.ends : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.ticketname = !isEmpty(data.ticketname) ? data.ticketname : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Event name needs to between 2 and 4o characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Event name is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description of the event is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location of the event is required";
  }
  if (Validator.isEmpty(data.starts)) {
    errors.starts = "Start time is required";
  }
  if (Validator.isEmpty(data.ends)) {
    errors.ends = "Ending time is required";
  }
  if (Validator.isEmpty(data.dateofevent)) {
    errors.date = "Date of  the event is required";
  }
  if (Validator.isEmpty(data.ticketname)) {
    errors.ticketname = "Ticket name is required";
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = "What type of event is this";
  }
  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = "How many tickets should we sell";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
