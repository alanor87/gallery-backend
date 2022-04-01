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
      // Reading image from the file system to buffer.
      const imageBuffer = fs.readFileSync(req.files[i].path);
      // Creating smaller version of image for the gallery tiles.
      const imageBuffer_small = await resizeImg(imageBuffer, {
        width: 370,
        format: "jpg",
      });

      // Converting buffered image to base 64 string, both big and small one.
      const imageBase64 = imageBuffer.toString("base64");
      const imageBase64_small = imageBuffer_small.toString("base64");

      // Uploading both images to hosting, both big and small one.
      const singleImageUploadResponse = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: `user_${userId}` }
      );
      const singleSmallImageUploadResponse = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64_small}`,
        { folder: `user_${userId}/small` }
      );

      // Getting url and hosting Id from the hosting response.
      const {
        secure_url: imageURL,
        public_id: imageHostingId,
        width,
        height,
      } = singleImageUploadResponse;
      const { secure_url: smallImageURL, public_id: smallImageHostingId } =
        singleSmallImageUploadResponse;

      console.log(width, height);
      // Creating new image object in collection.
      const newImage = await Image.create({
        imageURL,
        imageHostingId,
        smallImageURL,
        smallImageHostingId,
        width,
        height,
        imageInfo: {
          belongsTo: userId,
          tags: [],
          likes: [],
        },
      });

      // Adding new image object to the array, that is going to be sent to client after upload finishes.
      console.log(newImage);
      newImages.push(newImage);
      newImagesIds.push(newImage._id);
    }

    // Adding new images Id to the list of user owned images
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
    console.log(error);
    console.log(error.message + "Error while creating image.");
    error.message += "Error while creating image.";
    next(error);
  }
};

module.exports = uploadImages;
