const { PublicSettings } = require("../../models");

const getPublicSettings = async (_, res, next) => {
  try {
    const publicSettings = await PublicSettings.findOne({}).select("-_id");

    res.status(200).json({
      status: "Public settings fetched.",
      code: 200,
      body: publicSettings,
    });
  } catch (error) {
    error.message = "Error fetching public settings from DB.";
    next(error);
  }
};

module.exports = getPublicSettings;
