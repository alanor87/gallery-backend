const router = require('express').Router();
const { images } = require('../controllers');

router.get('/', images.getAll);

module.exports = router;