const { Schema } = require("mongoose");

const descriptionAnchor = Schema({
  anchorText: {
    type: String,
    default: "",
  },
  anchorTextStartPos: {
    type: Number,
    default: 0,
  },
});

const imageDescription = Schema({
  text: {
    type: String,
    default: "",
  },
  anchors: [descriptionAnchor],
});

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
      description: imageDescription,
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
