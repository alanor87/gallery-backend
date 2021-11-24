const { User } = require("../models");

const getUser = async (filter) => {
    const user = await User.findOne(filter).populate('userOwnedImages');
    return user;
}

module.exports = getUser;
