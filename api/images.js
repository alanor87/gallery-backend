const router = require('express').Router();
const { images } = require('../controllers');

router.get('/', images.getAll);
router.put('/:id', images.updateOne);

module.exports = router;