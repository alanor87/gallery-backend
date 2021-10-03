const { Schema } = require('mongoose');

const user = Schema({
    userName: {
        type: String,
        required: [true, 'User name is required.']
    },
    userEmail: {
        type: String,
        required: [true, 'User name is required.']
    },
    userPassword: {
        type: String,
        required: [true, 'User name is required.']
    },
    userToken: {
        type: String
    },
    userIsAuthenticated: {
        type: Boolean,
    },
});

module.exports = user;