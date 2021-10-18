const { User } = require('../../models');
const { getUser } = require('../../utils/');

const register = async (req, res, next) => {
    try {
        const userEmailDoesExist = await getUser({ userEmail: req.body.userEmail });
        const userNameDoesExist = await getUser({ userName: req.body.userName });
        if (userEmailDoesExist || userNameDoesExist) {
            res.
                status(409).
                json({
                    status: 'Conflict',
                    code: 409,
                    message: 'User with this email or name already exists.'
                })
            return;
        }

        const { userName, userEmail, userPassword } = req.body;
        const newUser = new User({ userName, userEmail });
        newUser.setHashedPassword(userPassword);
        const newUserData = await newUser.save();

        res.status(201).json({
            status: 'Success',
            code: 201,
            message: 'User was created.',
            data: {
                userName: newUserData.userName,
                userEmail: newUserData.userEmail,
            },
        })
    }
    catch (error) {
        const originalErrorMessage = error.message;
        error.message = `Error occured while creating user. ` + originalErrorMessage;
        next(error);
    }
};

module.exports = register;