const { Schema } = require("mongoose");

const publicSetting = Schema(
  {
    publicImagesList: [
      {
        type: Schema.Types.ObjectId,
        ref: "image",
      },
    ],
  },
  { collection: "publicSettings" }
);

module.exports = publicSetting;
