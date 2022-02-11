const { Image } = require("../../models");

async function getStandaloneImageView(req, res) {
  try {
    const image = await Image.findById(req.params.id);
    if (image.imageInfo.sharedByLink) {
      res.render("standaloneImage", {
        title: "Image!",
        message: "It works!",
        src: image.imageURL,
      });
    } else {
      res.status(403).json({
        code: 403,
        status: "Invalid link.",
        message: "The image is not accessible through standalone view.",
      });
    }
  } catch (error) {
    res.status(403).json({
      code: 403,
      status: "Invalid link.",
      message:
        "The image ID is invalid or not accessible through standalone view.",
    });
  }
}

module.exports = getStandaloneImageView;
