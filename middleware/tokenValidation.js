const jwt = require("jsonwebtoken");
const { getUser } = require("../utils");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const tokenValidation = async (req, res, next) => {
  try {
    const [_, token] = req.headers.authorization.split(" ");
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await getUser({ _id });

    if (!user) {
      res.status(404).json({
        status: "Not found.",
        code: 404,
        message: "User with current ID was not found",
      });
      return;
    }

    if (user.userToken !== token) {
      res.status(401).json({
        status: "Unauthorized.",
        code: 403,
        message: "Invalid token.",
      });
      return;
    }

    req.userId = _id;
    next();
  } catch (error) {
    res
      .status(401)
      .send(`Token validation error. Token might be invalid expired.`);
  }
};

module.exports = { tokenValidation };
