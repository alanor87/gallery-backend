const jwt = require('jsonwebtoken');
const { User } = require("../../models");
const { getUser } = require("../../utils/");
require('dotenv').config();

const register = async (req, res, next) => {
    try {
        const { userName, userEmail, userPassword } = req.body;
        const userEmailDoesExist = await getUser({ userEmail: userEmail });
        const userNameDoesExist = await getUser({ userName: userName });
        if (userEmailDoesExist || userNameDoesExist) {
            res.
                status(409).
                json({
                    status: 'Conflict',
                    code: 409,
                    message: 'User with this email or name already exists.'
                })
            return;
        };

        const newUser = new User({ userName, userEmail });
        newUser.setHashedPassword(userPassword);
        const newUserData = await newUser.save();
        const { _id } = newUserData;
        const userToken = jwt.sign({ _id }, process.env.SECRET_KEY);
        const userWithToken = await User.findOneAndUpdate({ _id }, { userToken: userToken }, { new: true });

        res.status(201).json({
            status: 'Success',
            code: 201,
            message: 'User was created.',
            body: {
                userName: newUserData.userName,
                userEmail: newUserData.userEmail,
                userToken: userWithToken.userToken,
            },
        })
    }
    catch (error) {
        const originalErrorMessage = error.message;
        error.message = `Error occured while creating user. ` + originalErrorMessage;
        next(error);
    };

};

module.exports = register;
