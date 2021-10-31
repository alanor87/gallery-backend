const jwt = require('jsonwebtoken');
const { User } = require('../../models/')
const { getUser } = require('../../utils');
require('dotenv').config();

const login = async (req, res, next) => {
    try {
        const requestedUser = await getUser({ userEmail: req.body.userEmail });
        if (!requestedUser || !requestedUser.comparePassword(req.body.userPassword)) {
            res.status(403)
                .json({
                    status: 'Forbidden',
                    code: 403,
                    message: 'Invalid email or password.',
                });
            return;
        }

        const { _id } = requestedUser;
        const userToken = jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '5h' });
        const userWithToken = await User.findOneAndUpdate({ _id }, { userToken: userToken }, { new: true }).populate('userOwnedImages');
        const { userPassword, ...userDataToSend } = userWithToken.toObject(); // analog of getSnapshot in MST))

        res.status(201)
            .json({
                status: 'Logged in',
                code: 201,
                message: 'User is logged in.',
                body: userDataToSend,
            });

    }
    catch (error) {
        const originalErrorMessage = error.message;
        error.message = `Error occured while logging in. ` + originalErrorMessage;
        next(error);
    }
}

module.exports = login;
