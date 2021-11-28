const router = require('express').Router();
const { images } = require('../controllers');
const { filesUploadHandler } = require('../middleware');

router.post('/upload', filesUploadHandler.array('images', 5), images.createOne);
router.get('/', images.getAll);
router.get('/:id', images.getOne);
router.put('/:id', images.updateOne);
router.delete('/:id/:imgHostingId', images.deleteOne);
router.post('/deleteMultiple', images.deleteMultiple);

module.exports = router;
