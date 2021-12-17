const { getUser } = require("../../utils");

const getUserOwnedImages = async (req, res, next) => {
  try {
    const currentUser = await getUser({ _id: req.userId });
    await currentUser.populate("userOwnedImages");
    const { userOwnedImages } = currentUser;
    res.status(200).json({
      message: "Success",
      code: 200,
      body: { userOwnedImages },
    });
  } catch (error) {
    error.message = `Error while loading images, owned by user.`;
    next(error);
  }
};

module.exports = getUserOwnedImages;
