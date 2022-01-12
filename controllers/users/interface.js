const { User } = require("../../models");

const saveInterface = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.userId },
    { userInterface: { ...req.body } }
  );
  res.status(200).json({
    status: "Success",
    code: 200,
    message: "Interface updated.",
  });
};

module.exports = { saveInterface };
