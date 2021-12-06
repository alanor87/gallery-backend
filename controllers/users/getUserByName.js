const { User } = require('../../models')

const getUserByName = async (req, res, next) => {
  try {
    const userDoesExist = await User.exists({ userName: req.body.userName });
    res.status(200).json({ userDoesExist: userDoesExist, code: 200 });
  } catch (error) {
    error.message = "User with this name was not found";
    next(error);
  }
};

module.exports = { getUserByName };
