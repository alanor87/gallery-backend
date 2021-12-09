const { User } = require("../../models");

/*
 * For each of the user names in userNameList (using $in operator) we edit the field imageOpenedToUser -
 * adding the derived with request imagesId from imagesIdList - but avoiding duplications
 * through using mondoDB $addToSet operator.
 */
const multiuserShare = async (req, res, next) => {
  try {
    console.log(req.body);
    await User.updateMany(
      { userName: { $in: req.body.usersNamesList } },
      { $addToSet: { imagesOpenedToUser: { $each: req.body.imagesIdList } } }
    );
    res.status(200).json({
      message: "Sharing test successful",
    });
  } catch (error) {
    error.message =
      "Error while performing multiple users images sharing. " + error.message;
    next(error);
  }
};

module.exports = multiuserShare;
