const { public } = require("../controllers");
const { images } = require("../controllers");
const { isImagePublic } = require("../middleware");
const router = require("express").Router();

router.get("/publicImages/:id", isImagePublic, images.getOne);
router.get("/standaloneShare/:id", public.getStandaloneImageView);
router.get("/publicImages", public.getPublicImages);
router.get("/publicSettings", public.getPublicSettings);

module.exports = router;
