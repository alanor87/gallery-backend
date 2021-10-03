const { model } = require('mongoose');
const { imageSchema } = require('./schemas');

const Image = model('image', imageSchema);

module.exports = Image;
