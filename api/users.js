const router = require("express").Router();
const { users } = require("../controllers");

router.get("/getUserByToken", users.getUserByToken);
router.post("/getUserByName", users.getUserByName);
router.patch("/interface", users.saveInterface);
router.get("/logout", users.logout);

module.exports = router;
