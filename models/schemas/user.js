const { Schema } = require('mongoose');

const user = Schema({
    userName: {
        type: String,
        required: [true, 'User name is required.'],
        unique: true,
    },
    userEmail: {
        type: String,
        required: [true, 'User email is required.'],
        unique: true,
    },
    userPassword: {
        type: String,
        required: [true, 'User password is required.']
    },
    userToken: {
        type: String
    },
    userIsAuthenticated: {
        type: Boolean,
    },
});

module.exports = user;