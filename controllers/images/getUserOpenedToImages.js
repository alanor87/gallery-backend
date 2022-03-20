const { getUser, omitedImageFields } = require("../../utils");

const getUserOpenedToImages = async (req, res) => {
  try {
    const { filter } = req.query;
    const currentPage = Number(req.query.currentPage);
    const imagesPerPage = Number(req.query.imagesPerPage);
    const offset = currentPage * imagesPerPage;
    switch (Boolean(filter)) {
      // if filter data is present.
      case true: {
        const { userOpenedToImages } = await getUser({ _id: req.userId })
          .select("userOpenedToImages")
          .populate({
            path: "userOpenedToImages",
            match: { "imageInfo.tags": filter },
            select: omitedImageFields.userSharedWith,
          });

        const allFilteredImagesId = userOpenedToImages.map((image) =>
          image._id.toString()
        );

        const filteredImagesWithPagination = userOpenedToImages.slice(
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
      case false: {
        // if no filter data is present.
        const { userOpenedToImages } = await getUser({ _id: req.userId })
          .select("userOpenedToImages")
          .populate({
            path: "userOpenedToImages",
            select: omitedImageFields.userSharedWith,
          });

        const imagesWithPagination = userOpenedToImages.slice(
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
    console.log(error);
    error.message = `Error while loading images, shared with user.`;
    next(error);
  }
};

module.exports = getUserOpenedToImages;
