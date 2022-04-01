const { Image } = require("../../models");
const { updatePublicImagesList } = require("../../utils");

const updateImages = async (req, res, next) => {
  try {
    const { imagesToUpdate } = req.body;

    const imagesUpdateRequests = imagesToUpdate.map(({ _id, imageInfo }) => {
      console.log("incoming image info : ", imageInfo);
      const infoUpdateObjectQuery = {};

      for (const key in imageInfo) {
        infoUpdateObjectQuery["imageInfo." + key] = imageInfo[key];
      }
      console.log(
        "query object with updating fields : ",
        infoUpdateObjectQuery
      );
      return Image.findByIdAndUpdate(
        _id,
        { $set: infoUpdateObjectQuery },
        { new: true }
      );
    });

    const updatedImages = await Promise.all(imagesUpdateRequests);

    await updatePublicImagesList(imagesToUpdate);

    res.status(200).json({
      message: "Images info updated successfully",
      code: 200,
      body: { updatedImages },
    });
  } catch (error) {
    console.log(error);
    error.message = `Error while updating images, ${error.message}`;
    next(error);
  }
};

module.exports = updateImages;
