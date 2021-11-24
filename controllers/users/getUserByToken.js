const { getUser } = require('../../utils');

const getUserByToken = async (req, res, next) => {
  console.log(req.userId);
  const user = await getUser({ _id: req.userId });
  const userDataToSend = user.toObject();
  delete userDataToSend.userPassword;
  res.status(200)
    .json({
      status: 'Logged in',
      code: 200,
      message: 'User is logged in.',
      body: userDataToSend,
    });
};

module.exports = { getUserByToken };