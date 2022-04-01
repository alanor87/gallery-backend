const { Schema } = require("mongoose");

const imageSchema = Schema(
  {
    imageURL: {
      type: String,
      required: [true, "Image URL is required"],
    },
    smallImageURL: {
      type: String,
    },
    imageHostingId: {
      type: String,
    },
    smallImageHostingId: {
      type: String,
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    imageInfo: {
      title: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
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
        default: false,
      },
      openedTo: {
        type: [String],
        default: [],
      },
      sharedByLink: {
        type: Boolean,
        default: false,
      },
    },
  },
  { versionKey: false, timeStamps: true }
);

module.exports = imageSchema;
