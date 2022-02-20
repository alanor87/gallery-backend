const { PublicSettings } = require("../../models");
const { omitedImageFields } = require("../../utils");

async function getPublicImages(req, res, next) {
  try {
    const { currentPage, imagesPerPage, filter } = req.query;
    const offset = currentPage * imagesPerPage;
    switch (Boolean(filter)) {
      // if filter data is present.
      case true: {
        const { publicImagesList } = await PublicSettings.findOne({})
          .select("publicImagesList")
          .populate({
            path: "publicImagesList",
            match: { "imageInfo.tags": filter },
            select: omitedImageFields.userPublic,
          });

        const allFilteredImagesId = publicImagesList.map((image) =>
          image._id.toString()
        );

        const filteredImagesWithPagination = publicImagesList.slice(
          offset,
          offset + imagesPerPage
        );

        res.status(200).json({
          message: "Success",
          code: 200,
          body: {
            images: filteredImagesWithPagination || [],
            allFilteredImagesId,
          },
        });
        break;
      }
      // if no filter data is absent.
      case false: {
        const { publicImagesList } = await PublicSettings.findOne({})
          .select("publicImagesList")
          .populate({
            path: "publicImagesList",
            options: { skip: offset, limit: imagesPerPage },
            select: omitedImageFields.userPublic,
          });
        res.status(200).json({
          message: "Success",
          code: 200,
          body: {
            images: publicImagesList || [],
            filteredImagesNumber: 0,
          },
        });
        break;
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = getPublicImages;
