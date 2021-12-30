const { Schema } = require("mongoose");

const publicSettings = Schema(
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

module.exports = publicSettings;
