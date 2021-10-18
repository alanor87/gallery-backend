const { Schema } = require('mongoose');
const bcryptjs = require('bcryptjs');

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
});

user.methods.setHashedPassword = function (rawPassword) {
    this.userPassword = bcryptjs.hashSync(rawPassword, bcryptjs.genSaltSync(10));
};

user.methods.comparePassword = function (incomingPassword) {
    return bcryptjs.compareSync(incomingPassword, this.userPassword);
};

module.exports = user;
