const { getUser } = require("../../utils");

const getUserOwnedImages = async (req, res, next) => {
  try {
    const { currentPage, imagesPerPage } = req.query;
    const offset = currentPage * imagesPerPage;
    const { userOwnedImages } = await getUser({ _id: req.userId })
      .select("userOwnedImages")
      .populate({
        path: "userOwnedImages",
        options: { skip: offset, limit: imagesPerPage },
      });
    res.status(200).json({
      message: "Success",
      code: 200,
      body: { images: userOwnedImages },
    });
  } catch (error) {
    error.message = `Error while loading images, owned by user.`;
    next(error);
  }
};

module.exports = getUserOwnedImages;
