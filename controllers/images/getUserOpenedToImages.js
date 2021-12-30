const { getUser } = require("../../utils");

const getUserOpenedToImages = async (req, res) => {
  try {
    const { currentPage, imagesPerPage } = req.query;
    const offset = currentPage * imagesPerPage;
    const { userOpenedToImages } = await getUser({ _id: req.userId })
      .select("userOpenedToImages")
      .populate({
        path: "userOpenedToImages",
        skip: offset,
        limit: imagesPerPage,
      });
    res.status(200).json({
      message: "Success",
      code: 200,
      body: { images: userOpenedToImages },
    });
  } catch (error) {
    console.log(error);
    error.message = `Error while loading images, shared with user.`;
    next(error);
  }
};

module.exports = getUserOpenedToImages;
