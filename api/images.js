const router = require('express').Router();
const { images } = require('../controllers');
const { filesUploadHandler } = require('../middleware');

router.post('/upload', filesUploadHandler.single('image'), images.createOne);
router.get('/', images.getAll);
router.get('/:id', images.getOne);
router.put('/:id', images.updateOne);
router.delete('/:id', images.deleteOne);

module.exports = router;
