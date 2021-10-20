const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const tokenValidation1 = (req, res, next) => {
    try {
        const [_, token] = req.headers.authorization.split(' ');
        const { _id } = jwt.verify(token, SECRET_KEY);
        next();
    }
    catch (error) {
        const originalErrorMessage = error.message;
        error.message = `Token validation error. ` + originalErrorMessage;
        next(error);
    }

}

module.exports = { tokenValidation1 };