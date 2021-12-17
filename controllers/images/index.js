const uploadImages = require("./uploadImages");
const getOne = require("./getOne");
const getUserOwnedImages = require("./getUserOwnedImages");
const getUserOpenedToImages = require("./getUserOpenedToImages");
const updateImages = require("./updateImages");
const multiuserShare = require("./multiuserShare");
const deleteImages = require("./deleteImages");

module.exports = {
  uploadImages,
  getUserOwnedImages,
  getUserOpenedToImages,
  getOne,
  updateImages,
  multiuserShare,
  deleteImages,
};
