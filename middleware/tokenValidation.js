const jwt = require('jsonwebtoken');
const { getUser } = require('../utils');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const tokenValidation = (req, res, next) => {
    try {
        const [_, token] = req.headers.authorization.split(' ');
        const { _id } = jwt.verify(token, SECRET_KEY);
        const user = getUser({ _id });

        if (!user) res.status(404).json({
            status: 'Not found.',
            code: 404,
            message: 'User with current ID was not found'
        });

        req.userId = _id;
        next();
    }
    catch (error) {
        const originalErrorMessage = error.message;
        error.message = `Token validation error. ` + originalErrorMessage;
        next(error);
    }

}

module.exports = { tokenValidation };