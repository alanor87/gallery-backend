const { getUser } = require("../../utils");

const getUserOpenedToImages = async (req, res) => {
  try {
    const currentUser = await getUser({ _id: req.userId });
    await currentUser.populate("userOpenedToImages", "-imageHostingId");
    const { userOpenedToImages } = currentUser;
    res.status(200).json({
      message: "Success",
      code: 200,
      body: { userOpenedToImages },
    });
  } catch (error) {
    error.message = `Error while loading images, shared with user.`;
    next(error);
  }
};

module.exports = getUserOpenedToImages;
