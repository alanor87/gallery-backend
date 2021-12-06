const { getUser } = require("../../utils");

const getUserByName = async (req, res, next) => {
  try {
    const userDoesExist = await getUser({ userName: req.body.name });
    res.status(200).json({ userDoesExist: userDoesExist, code: 200 });
  } catch (error) {
    error.message = +"User with this name was not found";
    next(error);
  }
};

module.exports = { getUserByName };
