const { PublicSettings } = require("../../models");
const { omitedImageFields } = require("../../utils");

async function getPublicImages(req, res, next) {
  const { filter } = req.query;
  const currentPage = Number(req.query.currentPage);
  const imagesPerPage = Number(req.query.imagesPerPage);

  const offset = currentPage * imagesPerPage;
  try {
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
      // if filter data is absent.
      case false: {
        const { publicImagesList } = await PublicSettings.findOne({})
          .select("publicImagesList")
          .populate({
            path: "publicImagesList",
            select: omitedImageFields.userPublic,
          });

        console.log(publicImagesList.map((image) => image._id.toString()));

        const imagesWithPagination = publicImagesList.slice(
          offset,
          offset + imagesPerPage
        );

        res.status(200).json({
          message: "Success",
          code: 200,
          body: {
            images: imagesWithPagination || [],
            filteredImagesNumber: 0,
          },  
        });
        break;
      }
    }
  } catch (error) {
    console.log("error", error.message);
    next(error);
  }
}
const dfd = () => {};
module.exports = getPublicImages;
