const { User } = require("../models");

/** Defines if the user with provided id is the owner of image with provided id. */

async function isImageOwner(userId, imageId) {
  const user = await User.findById(userId).select("userOwnedImages");
  return user.userOwnedImages.find((id) => id.toString() === imageId);
}

module.exports = isImageOwner;
