const router = require('express').Router();
const { users } = require('../controllers')

router.get("/logout", users.logout);

module.exports = router;