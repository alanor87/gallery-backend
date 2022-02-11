const { User } = require("../models");

/*
 * Returning user instance as it is.
 */

const getUser = (filter) => {
  return User.findOne(filter);
};

module.exports = getUser;
