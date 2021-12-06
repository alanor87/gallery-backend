const { Schema } = require("mongoose");

const imageSchema = Schema(
  {
    imageURL: {
      type: String,
      required: [true, "Image URL is required"],
    },
    imageHostingId: {
      type: String,
    },
    smallImageURL: {
      type: String,
    },
    imageInfo: {
      tags: {
        type: [String],
        default: [],
      },
      likes: {
        type: [String],
        default: [],
      },
      belongsTo: {
        type: String,
        default: "",
        required: true,
      },
      isPublic: {
        type: Boolean,
        default: true,
      },
      openedTo: {
        type: [String],
        default: [],
      },
    },
  },
  { versionKey: false, timeStamps: true }
);

module.exports = imageSchema;
