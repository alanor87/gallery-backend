const { PublicSetting } = require("../../models");

async function getPublicImages(req, res, next) {
  try {
    const publicSettings = await PublicSetting.findOne({});
    await publicSettings.populate("publicImagesList");
    console.log(publicSettings.publicImagesList);
    res.status(200).json({
      message: "Success getting public images.",
      code: 200,
      body: { publicImages: publicSettings.publicImagesList },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getPublicImages;
