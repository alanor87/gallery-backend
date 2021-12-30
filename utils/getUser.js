const { User } = require("../models");

/*
 * Returning user instance either as it is.
 */

const getUser = (filter) => {
  return User.findOne(filter);
};

module.exports = getUser;
