const { User } = require("../../models");

const multiuserShare = async (req, res, next) => {
  try {
    const { usersList, imagesIdList } = req.body;
    const usersSharedWith = [];
    const usersNotSharedWith = [];

    /*
     * Separating usersList on lists of users who were shared the images with -
     *  and those who were deleted from image openedToList.
     */
    usersList.forEach((user) => {
      switch (user.action) {
        case "add":
          usersSharedWith.push(user.name);
          break;
        case "remove":
          usersNotSharedWith.push(user.name);
          break;
        default:
          break;
      }
    });

    /*
     *  Adding imagesID to those users, whom this image was shared with.
     */
    await User.updateMany(
      { userName: { $in: usersSharedWith } },
      { $addToSet: { imagesOpenedToUser: { $each: imagesIdList } } }
    );

    /*
     *  Removing imagesID from those users, who were removed from images openedTo list.
     */
    await User.updateMany(
      { userName: { $in: usersNotSharedWith } },
      { $pullAll: { imagesOpenedToUser: imagesIdList } }
    );
    res.status(200).json({
      message: "Sharing successful.",
    });
  } catch (error) {
    console.log(error);
    error.message =
      "Error while performing multiple users images sharing. " + error.message;
    next(error);
  }
};

module.exports = multiuserShare;
