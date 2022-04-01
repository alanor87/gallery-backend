const { PublicSettings } = require("../../models");

async function getBackgroundImage(req, res, next) {
  try {
    const { publicImagesList } = await PublicSettings.findOne({})
      .select("publicImagesList")
      .populate({
        path: "publicImagesList",
        match: { width: { $gte: 1300 } },
        select: "imageURL -_id",
        limit: 10,
      });

    let backgroundImageUrl;
    const largeImagesUrls = publicImagesList.map((image) => image.imageURL);

    if (!largeImagesUrls.length) {
      backgroundImageUrl =
        "https://" + req.headers.host + "/static/default_background.jpg";
    } else {
      const randomUrlIndex = Math.ceil(
        Math.random() * largeImagesUrls.length - 1
      );
      backgroundImageUrl = largeImagesUrls[randomUrlIndex];
    }

    res.status(200).json({
      body: {
        backgroundImage: backgroundImageUrl,
      },
    });
  } catch (error) {
    console.log("Error getting background image : ", error);
    next(error);
  }
}

module.exports = getBackgroundImage;
