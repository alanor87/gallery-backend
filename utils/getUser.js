const { User } = require("../models");

/* Returning user instance either as it is - or with all the user owned image objects.
 * Good to have the option to avoid overfetching.
 */
const getUser = async (filter, populate = true) => {
  const user = await User.findOne(filter);
  return populate ? user.populate("userOwnedImages") : user;
};

module.exports = getUser;
