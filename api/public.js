const { public } = require("../controllers");
const router = require("express").Router();

router.get("/publicImages", public.getPublicImages);

module.exports = router;
