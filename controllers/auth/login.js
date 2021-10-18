const { User } = require('../../models');
const { getUser } = require('../../utils');

const login = async (req, res, next) => {
    try {
        const requestedUser = await getUser({ userEmail: req.body.userEmail });
        if (!requestedUser || !requestedUser.comparePassword(req.body.userPassword))
            res.status(403)
                .json({
                    status: 'Forbidden',
                    code: 403,
                    message: 'Invalid email or password.',
                });

        res.status(201)
            .json({
                status: 'Logged in',
                code: 201,
                message: 'User is logged in.',
                data: {
                    userName: requestedUser.userName,
                    userEmail: requestedUser.userEmail,
                },
            });


    }
    catch (error) {
        const originalErrorMessage = error.message;
        error.message = `Error occured while logging in. ` + originalErrorMessage;
        next(error);
    }
}

module.exports = login;