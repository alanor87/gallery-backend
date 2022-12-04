const { Image } = require("../../models");

const siteUrl =
  process.env.NODE_ENV === "production"
    ? "https://focused-carson-2ae3a4.netlify.app/gallery"
    : "http://localhost:3000";

async function getStandaloneImageView(req, res) {
  try {
    const image = await Image.findById(req.params.id);
    if (image.imageInfo.sharedByLink) {
      res.render("standaloneImage", {
        title: image.imageInfo?.title || '',
        message: image.imageInfo?.title || '',
        description: image.imageInfo?.description || '',
        src: image.imageURL,
        siteUrl,
      });
    } else {
      res.render("standaloneImageError", {
        title: "Error",
        message: "The image is not accessible through standalone view.",
      });
    }
  } catch (error) {
    res.render("standaloneImageError", {
      title: "Error",
      message:
        "The image ID is invalid or not accessible through standalone view.",
    });
  }
}

module.exports = getStandaloneImageView;
