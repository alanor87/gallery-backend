const { Image } = require("../../models");
const { updatePublicImagesList } = require("../../utils");

const updateImages = async (req, res, next) => {
  try {
    const { imagesToUpdate } = req.body;

    const imagesUpdateRequests = imagesToUpdate.map(({ _id, imageInfo }) => {
      return Image.findByIdAndUpdate(_id, { imageInfo }, { new: true });
    });

    const updatedImages = await Promise.all(imagesUpdateRequests);

    await updatePublicImagesList(imagesToUpdate);

    res.status(200).json({
      message: "Images info updated successfully",
      code: 200,
      body: { updatedImages },
    });
  } catch (error) {
    error.message = `Error while updating images, ${error.message}`;
    next(error);
  }
};

module.exports = updateImages;
