const { model } = require("mongoose");
const { publicSettingSchema } = require("./schemas");

const PublicSetting = model("publicSetting", publicSettingSchema);

module.exports = PublicSetting;
