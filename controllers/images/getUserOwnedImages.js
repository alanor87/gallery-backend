const { getUser, omitedImageFields } = require("../../utils");

const getUserOwnedImages = async (req, res, next) => {
  try {
    const { currentPage, imagesPerPage, filter } = req.query;
    const offset = currentPage * imagesPerPage;
    switch (Boolean(filter)) {
      case true: {
        const { userOwnedImages } = await getUser({ _id: req.userId })
          .select("userOwnedImages")
          .populate({
            path: "userOwnedImages",
            match: { "imageInfo.tags": filter },
            select: omitedImageFields.userOwner,
          });

        const filteredImagesWithPagination = userOwnedImages.slice(
          offset,
          offset + imagesPerPage
        );
        res.status(200).json({
          message: "Success",
          code: 200,
          body: {
            images: filteredImagesWithPagination || [],
            filteredImagesNumber: userOwnedImages.length,
          },
        });
        break;
      }
      case false: {
        const { userOwnedImages } = await getUser({ _id: req.userId })
          .select("userOwnedImages")
          .populate({
            path: "userOwnedImages",
            options: { skip: offset, limit: imagesPerPage },
            select: omitedImageFields.userOwner,
          });
        res.status(200).json({
          message: "Success",
          code: 200,
          body: {
            images: userOwnedImages || [],
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
