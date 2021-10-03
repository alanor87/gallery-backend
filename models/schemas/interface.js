const { Schema } = require('mongoose');

const inerface = Schema({
    backgroundImage: {
        type: String,
        default: '',
    },
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

module.exports = inerface;