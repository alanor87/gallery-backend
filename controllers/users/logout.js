const { User } = require("../../models");

const logout = async (req, res) => {
  await User.findOneAndUpdate({ _id: req.userId }, { userToken: "" });
  res.status(200).json({
    status: "Success",
    code: 200,
    message: "Logout success.",
  });
};

module.exports = { logout };
