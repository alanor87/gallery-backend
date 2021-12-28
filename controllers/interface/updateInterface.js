const { Interface } = require("../../models");

const updateInterfaceSettings = async (req, res) => {
  try {
    const newInterfaceSettings = req.body;
    const settings = await Interface.findByIdAndUpdate(
      newInterfaceSettings._id,
      newInterfaceSettings,
      { new: true }
    );
    res.status(200).json({
      code: 200,
      status: "Interface saving success",
      body: settings,
    });
  } catch (error) {
    error.message = "Error while updating interface settings.";
    next(error);
  }
};

module.exports = updateInterfaceSettings;
