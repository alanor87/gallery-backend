const { public } = require("../controllers");
const router = require("express").Router();

router.get("/publicImages", public.getPublicImages);
router.get("/publicSettings", public.getPublicSettings);

module.exports = router;
