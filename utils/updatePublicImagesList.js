const { PublicSettings } = require("../models");

async function updatePublicImagesList(imagesToUpdate) {
  try {
    const imagesToAdd = [];
    const imagesToRemove = [];
    imagesToUpdate.forEach(({ _id, imageInfo }) => {
      // Defining if isPublic field is present in the incoming update object. If this field was not changed
      // by user - it is not present in thhe update object, in this case current imageId is not
      // touched in the publicImageList at all.
      if (!("isPublic" in imageInfo)) return;

      // If the field is present - means that it was changed by user. All imagesId divided on two groups -
      // ids that should be added to list - and those to be removed.
      if (imageInfo.isPublic) {
        imagesToAdd.push(_id);
      } else {
        console.log("tells me it is not in public list");
        imagesToRemove.push(_id);
      }
    });

    await PublicSettings.findOneAndUpdate(
      {},
      { $pullAll: { publicImagesList: imagesToRemove } }
    );

    await PublicSettings.findOneAndUpdate(
      {},
      { $addToSet: { publicImagesList: { $each: imagesToAdd } } }
    );
  } catch (error) {
    error.message = `Error while updating public images list, ${error.message}`;
    throw error;
  }
}

module.exports = updatePublicImagesList;
