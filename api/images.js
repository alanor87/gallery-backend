const router = require("express").Router();
const { images } = require("../controllers");
const { filesUploadHandler } = require("../middleware");

router.post("/upload", filesUploadHandler.array("images", 5), images.uploadImages);
router.get("/", images.getAll);
router.get("/:id", images.getOne);
router.put("/:id", images.updateOne);
router.put("/updateMultiple", images.updateMultiple);
router.post("/deleteImages", images.deleteImages);

module.exports = router;
