const { PublicSettings } = require("../models");

/** Defines, if the image with provided id is in the publicImages list.
 * If true - attaches imageIsPublic = true flag to request object
 * and passes it to next() function.
 */

// In this case publicImagesList we are getting from PublicSettings collection (contains a single document)
// is an array of ObjectId entries rather simple strings - because we need it to have the ability to be populated.
// Therefore - when swiping with Array.find() through this array and looking for the params.id from request -
// there is a need to turn ObjectId type into string, its achieved by .toString() method.

async function isImagePublic(req, res, next) {
  try {
    const { publicImagesList } = await PublicSettings.findOne({});
    const imageIsPublic = publicImagesList.find(
      (id) => id.toString() === req.params.id
    );
    if (imageIsPublic) {
      req.isPublicRequest = true;
      next();
    } else {
      const error = new Error("Image is not in public access.");
      next(error);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { isImagePublic };
