const { Image } = require("../../models");

const updateImages = async (req, res, next) => {
  try {
    const { imagesToUpdate } = req.body;
    const imagesUpdateRequests = imagesToUpdate.map(({ _id, imageInfo }) =>
      Image.findByIdAndUpdate(_id, { imageInfo }, { new: true })
    );
    const updatedImages = await Promise.all(imagesUpdateRequests);
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
