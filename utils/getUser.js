const { User } = require("../models");

/*
 * Returning user instance either as it is.
 */

const getUser = async (filter) => {
  const user = await User.findOne(filter);
  return user;
};

module.exports = getUser;
