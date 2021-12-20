const { PublicSetting } = require("../models");

async function getPublicImagesList() {
  try {
    const publicSetting = await PublicSetting.find();
    return publicSetting.publicImagesList;
  } catch (error) {
    error.message = `Error getting public images list. ${error.message}`;
    throw error;
  }
}

module.exports = getPublicImagesList;
