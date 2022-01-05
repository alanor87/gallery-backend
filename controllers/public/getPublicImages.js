const { PublicSettings } = require("../../models");

async function getPublicImages(req, res, next) {
  try {
    const { currentPage, imagesPerPage, filter } = req.query;
    const offset = currentPage * imagesPerPage;
    switch (Boolean(filter)) {
      case true: {
        const { publicImagesList } = await PublicSettings.findOne({})
          .select("publicImagesList")
          .populate({
            path: "publicImagesList",
            match: { "imageInfo.tags": filter },
            select: "-imageHostingId",
          });

        const filteresImagesWithPagination = publicImagesList.slice(
          offset,
          offset + imagesPerPage
        );
        res.status(200).json({
          message: "Success",
          code: 200,
          body: {
            images: filteresImagesWithPagination || [],
            filteredImagesNumber: publicImagesList.length,
          },
        });
        break;
      }
      case false: {
        const { publicImagesList } = await PublicSettings.findOne({})
          .select("publicImagesList")
          .populate({
            path: "publicImagesList",
            options: { skip: offset, limit: imagesPerPage },
            select: "-imageHostingId",
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
