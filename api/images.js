const router = require("express").Router();
const { images } = require("../controllers");
const { filesUploadHandler } = require("../middleware");

router.post(
  "/upload",
  filesUploadHandler.array("images", 5),
  images.uploadImages
);
router.get("/", images.getAll);
router.get("/:id", images.getOne);
router.put("/updateImages", images.updateImages);
router.post("/multiuserShare", images.multiuserShare);
router.post("/deleteImages", images.deleteImages);

module.exports = router;
