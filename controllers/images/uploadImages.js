const { User, Image } = require("../../models");
const { cloudinary } = require("../../utils");

const uploadImages = async (req, res, next) => {
  try {
    const { userId } = req;
    const newImages = [];
    const newImagesIds = [];
    for (let i = 0; i < req.files.length; i += 1) {
      console.log(`Image path number ${i} : ${req.files[i].path}`);
      const singleImageUploadResponse = await cloudinary.uploader.upload(
        req.files[i].path
      );
      const { url: imageURL, public_id: imageHostingId } =
        singleImageUploadResponse;
      const newImage = await Image.create({
        imageURL,
        imageHostingId,
        imageInfo: {
          belongsTo: userId,
          tags: [],
          likes: [],
        },
      });
      newImages.push(newImage);
      newImagesIds.push(newImage._id);
    }

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { userOwnedImages: { $each: newImagesIds } } }
    );

    res.status(201).json({
      status: "Success",
      code: 201,
      message: "Image created.",
      newImages,
    });
  } catch (error) {
    console.log(error)
    error.message += `Error while creating image.`;
    next(error);
  }
};

module.exports = uploadImages;
