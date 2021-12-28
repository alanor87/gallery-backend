const { Image, User } = require("../../models");
const { cloudinary } = require("../../utils");

const deleteImages = async (req, res, next) => {
  try {
    const { imagesToDelete } = req.body;
    const deleteIdList = imagesToDelete.map((image) => image.selectedId);
    const deleteHostingIdList = imagesToDelete.map(
      (image) => image.imageHostingId
    );

    /*
     * Deleting images from DB.
     */
    await Image.deleteMany({ _id: { $in: deleteIdList } });

    /*
     * Deleting images from hosting.
     */
    await cloudinary.api.delete_resources(deleteHostingIdList);

    /*
     * Deleting images IDs from userOpenedToImages in User object.
     */
    await User.updateMany(
      {},
      { $pullAll: { userOpenedToImages: deleteIdList } }
    );

    /*
     * Deleting images IDs from userOwnedImages in User object.
     */
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId },
      { $pullAll: { userOwnedImages: deleteIdList } },
      { new: true }
    );

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Images deleted.",
      newImagesList: updatedUser.userOwnedImages,
    });
  } catch (error) {
    console.log("Error while deleting : ", error);
    error.message = "Error while deleting multiple images.";
    next(error);
  }
};

module.exports = deleteImages;
