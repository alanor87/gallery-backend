const { getUser } = require("../../utils");

const getUserByToken = async (req, res) => {
  const user = await getUser({ _id: req.userId });
  const { userPassword, ...userDataToSend } = user.toObject();
  res.status(200).json({
    status: "Logged in.",
    code: 200,
    message: "User is logged in.",
    body: userDataToSend,
  });
};

module.exports = { getUserByToken };
