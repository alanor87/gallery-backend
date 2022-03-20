const { getUser, omitedImageFields } = require("../../utils");

const getUserOwnedImages = async (req, res, next) => {
  try {
    const { filter } = req.query;
    const currentPage = Number(req.query.currentPage);
    const imagesPerPage = Number(req.query.imagesPerPage);
    const offset = currentPage * imagesPerPage;
    switch (Boolean(filter)) {
      // if filter data is present.
      case true: {
        const { userOwnedImages } = await getUser({ _id: req.userId })
          .select("userOwnedImages")
          .populate({
            path: "userOwnedImages",
            match: { "imageInfo.tags": filter },
            select: omitedImageFields.userOwner,
          });

        const allFilteredImagesId = userOwnedImages.map((image) =>
          image._id.toString()
        );

        const filteredImagesWithPagination = userOwnedImages.slice(
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
      // if no filter data is present.
      case false: {
        const { userOwnedImages } = await getUser({ _id: req.userId })
          .select("userOwnedImages")
          .populate({
            path: "userOwnedImages",
            select: omitedImageFields.userOwner,
          });

        const imagesWithPagination = userOwnedImages.slice(
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
    error.message = `Error while loading images, owned by user.`;
    next(error);
  }
};

module.exports = getUserOwnedImages;
