const router = require('express').Router();
const { users } = require('../controllers');

router.patch("/interface", users.saveInterface);
router.get("/logout", users.logout);

module.exports = router;