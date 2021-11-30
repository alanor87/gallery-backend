const { Image, User } = require("../../models");
const { cloudinary } = require("../../utils");
const { getUser } = require("../../utils");

const deleteMultiple = async (req, res, next) => {
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
    const resultDB = await Promise.all(deleteDBRequests);
    console.log("Delete from DB : ", resultDB);

    /*
     * Deleting images from hosting.
     */
    const deleteHostingRequests = deleteHostingIdList.map((hostingId) =>
      cloudinary.api.delete_resources(hostingId)
    );
    const resultHosting = await Promise.all(deleteHostingRequests);
    console.log("Delete from hosting : ", resultHosting);

    /*
     * Deleting images IDs from userOwnedImages in User object.
     */
    const currentUser = await User.findById(req.userId);
    const { userOwnedImages } = currentUser;
    console.log("currentUserOwnedImages : ", userOwnedImages);
    const newUserOwnedImagesList = userOwnedImages.filter(
      (imageId) => !deleteIdList.includes(imageId)
    );
    console.log("newUserOwnedImagesList : ", newUserOwnedImagesList);
    currentUser.userOwnedImages = newUserOwnedImagesList;
    const updatedUser = await currentUser.save();
    console.log("updatedUser : ", updatedUser);

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

module.exports = deleteMultiple;
