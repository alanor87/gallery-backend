const { getUser } = require("../../utils");

const getUserOpenedToImages = async (req, res) => {
  try {
    const { currentPage, imagesPerPage, filter } = req.query;
    const offset = currentPage * imagesPerPage;
    switch (Boolean(filter)) {
      case true: {
        const { userOpenedToImages } = await getUser({ _id: req.userId })
          .select("userOpenedToImages")
          .populate({
            path: "userOpenedToImages",
            match: { "imageInfo.tags": filter },
            select: "-imageHostingId -smallImageHostingId",
          });

        const filteredImagesWithPagination = userOpenedToImages.slice(
          offset,
          offset + imagesPerPage
        );
        res.status(200).json({
          message: "Success",
          code: 200,
          body: {
            images: filteredImagesWithPagination || [],
            filteredImagesNumber: userOpenedToImages.length,
          },
        });
        break;
      }
      case false: {
        const { userOpenedToImages } = await getUser({ _id: req.userId })
          .select("userOpenedToImages")
          .populate({
            path: "userOpenedToImages",
            options: { skip: offset, limit: imagesPerPage },
            select: "-imageHostingId -smallImageHostingId",
          });
        res.status(200).json({
          message: "Success",
          code: 200,
          body: {
            images: userOpenedToImages || [],
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
