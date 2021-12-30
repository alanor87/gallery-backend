const { PublicSettings } = require("../../models");

async function getPublicImages(req, res, next) {
  try {
    const { currentPage, imagesPerPage } = req.query;
    const offset = currentPage * imagesPerPage;
    const { publicImagesList } = await PublicSettings.findOne({})
      .select("publicImagesList")
      .populate({
        path: "publicImagesList",
        skip: offset,
        limit: imagesPerPage,
        select: "-imageHostingId",
      });
    console.log(offset, publicImagesList);
    res.status(200).json({
      message: "Success getting public images.",
      code: 200,
      body: { images: publicImagesList },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getPublicImages;
