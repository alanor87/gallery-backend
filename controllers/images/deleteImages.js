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
    const deleteDBRequests = deleteIdList.map((_id) =>
      Image.findByIdAndDelete(_id)
    );
    await Promise.all(deleteDBRequests);

    /*
     * Deleting images from hosting.
     */
    const deleteHostingRequests = deleteHostingIdList.map((hostingId) =>
      cloudinary.api.delete_resources(hostingId)
    );
    await Promise.all(deleteHostingRequests);

    /*
     * Deleting images IDs from userOwnedImages in User object.
     */
    const currentUser = await User.findById(req.userId);
    const { userOwnedImages } = currentUser;
    const newUserOwnedImagesList = userOwnedImages.filter(
      (imageId) => !deleteIdList.includes(String(imageId))
    );
    currentUser.userOwnedImages = newUserOwnedImagesList;
    const updatedUser = await currentUser.save();

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Images deleted.",
      newImagesList: updatedUser.userOwnedImages,
    });
  } catch (error) {
    error.message = "Error while deleting multiple images.";
    next(error);
  }
};

module.exports = deleteImages;
