const { Image } = require("../../models");
const { omitedImageFields, isImageOwner } = require("../../utils");

const getOne = async (req, res, next) => {
  const imageIdToGet = req.params.id;
  try {
    // isPublicRequest flag is true whenever the request comes from public gallery page -
    // and the requested image is present in the publicImages list.
    let fieldsToExclude;
    if (req.isPublicRequest) {
      fieldsToExclude = omitedImageFields.userPublic;
    } else {
      fieldsToExclude = (await isImageOwner(req.userId, imageIdToGet))
        ? omitedImageFields.userOwner
        : omitedImageFields.userSharedWith;
    }

    const image = await Image.findById(imageIdToGet).select(fieldsToExclude);
    if (!image)
      res.status(404).json({
        status: "Success",
        code: 404,
        message: `Image was not found by ID ${imageIdToGet}`,
      });

    res.status(200).json({
      status: "Success",
      code: 200,
      body: image,
    });
  } catch (error) {
    error.message = `Error while getting image (ID : ${imageIdToGet} ).`;
    next(error);
  }
};

module.exports = getOne;
