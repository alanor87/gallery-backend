const { PublicSettings } = require("../../models");

const getPublicSettings = async (req, res, next) => {
  try {
    const publicSettings = await PublicSettings.find({}).select("-_id");

    res.status(200).json({
      status: "Public settings fetched.",
      code: 200,
      body: { publicSettings: publicSettings[0] },
    });
  } catch (error) {
    error.message = "Error fetching public settings from DB.";
    next(error);
  }
};

module.exports = getPublicSettings;
