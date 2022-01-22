const { PublicSettings } = require("../models");

// In this case publicImagesList we are getting from PublicSettings collection (contains a single document)
// is an array of ObjectId entries rather simple strings - because we need it to have the ability to be populated.
// Therefore - when swiping with Array.find() through this array and looking for the params.id from request -
// there is a need to turh ObjectId type into string, its achieved by .toString() method.

async function isImagePublic(req, res, next) {
  try {
    const { publicImagesList } = await PublicSettings.findOne({});
    const imageIsPublic = publicImagesList.find(
      (id) => id.toString() === req.params.id
    );
    if (imageIsPublic) {
      next();
    } else {
      const error = new Error("Image is not in public access");
      next(error);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { isImagePublic };
