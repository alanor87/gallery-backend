const router = require('express').Router();
const path = require('path');
const { images } = require('../controllers');
const imgStorePath = path.join(process.cwd(), "uploads");
const multer = require('multer')();

console.log('imgStorePath : ', imgStorePath);



router.post('/upload', multer.single('image'), images.createOne);
router.get('/', images.getAll);
router.get('/:id', images.getOne);
router.put('/:id', images.updateOne);
router.delete('/:id', images.deleteOne);

module.exports = router;