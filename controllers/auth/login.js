const { User } = require("../../models");

const login = (req, res, next) => {
  res.json(req.body);
};

module.exports = login;
