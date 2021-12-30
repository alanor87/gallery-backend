const { model } = require("mongoose");
const { publicSettingsSchema } = require("./schemas");

const PublicSettings = model("publicSetting", publicSettingsSchema);

module.exports = PublicSettings;
