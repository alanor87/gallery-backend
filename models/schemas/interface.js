const { Schema } = require("mongoose");

const interface = Schema({
  lightThemeIsOn: {
    type: Boolean,
    default: false,
  },
  imagesPerPage: {
    type: Number,
    default: 10,
  },
  sidePanelIsOpen: {
    type: Boolean,
    default: false,
  },
});

module.exports = interface;
