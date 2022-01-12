const { User, Image } = require("../../models");
const fs = require("fs");
const resizeImg = require("resize-img");
const { cloudinary } = require("../../utils");

const uploadImages = async (req, res, next) => {
  try {
    const { userId } = req;
    const newImages = [];
    const newImagesIds = [];
    for (let i = 0; i < req.files.length; i += 1) {
      const imageBuffer = fs.readFileSync(req.files[i].path);
      const imageBuffer_small = await resizeImg(imageBuffer, {
        width: 370,
        height: 200,
        format: "jpg",
      });

      const imageBase64 = imageBuffer.toString("base64");
      const imageBase64_small = imageBuffer_small.toString("base64");

      const singleImageUploadResponse = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: `user_${userId}` }
      );
      const singleSmallImageUploadResponse = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64_small}`,
        { folder: `user_${userId}/small` }
      );

      const { secure_url: imageURL, public_id: imageHostingId } =
        singleImageUploadResponse;
      const { secure_url: smallImageURL, public_id: smallImageHostingId } =
        singleSmallImageUploadResponse;
      const newImage = await Image.create({
        imageURL,
        smallImageURL,
        smallImageHostingId,
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
    console.log(error.message + "Error while creating image.");
    error.message += "Error while creating image.";
    next(error);
  }
};

module.exports = uploadImages;
