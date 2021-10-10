const router = require('express').Router();
const { images } = require('../controllers');

router.post('/', images.createOne);
router.get('/', images.getAll);
router.get('/:id', images.getOne);
router.put('/:id', images.updateOne);
router.delete('/:id', images.deleteOne);

module.exports = router;