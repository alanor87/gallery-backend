const { model } = require('mongoose');
const { interfaceSchema } = require('./schemas');

const Interface = model('interface', interfaceSchema);

module.exports = Interface;
