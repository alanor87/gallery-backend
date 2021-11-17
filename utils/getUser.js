const { User } = require("../models");

const getUser = async (filter) => {
  console.log("User");
  const user = await User.findOne(filter);
  return user;
};

module.exports = getUser;
