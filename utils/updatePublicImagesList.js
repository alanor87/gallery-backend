const { PublicSetting } = require("../models");

async function updatePublicImagesList(imagesToUpdate) {
  try {
    const imagesToAdd = [];
    const imagesToRemove = [];

    imagesToUpdate.forEach(({ _id, imageInfo }) => {
      if (imageInfo.isPublic) {
        imagesToAdd.push(_id);
      } else {
        imagesToRemove.push(_id);
      }
    });

    await PublicSetting.findOneAndUpdate(
      {},
      { $pullAll: { publicImagesList: imagesToRemove } }
    );

    await PublicSetting.findOneAndUpdate(
      {},
      { $addToSet: { publicImagesList: { $each: imagesToAdd } } }
    );
  } catch (error) {
    error.message = `Error while updating public images list, ${error.message}`;
    throw error;
  }
}

module.exports = updatePublicImagesList;
