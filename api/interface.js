const router = require('express').Router();
const { interface } = require('../controllers/')

router.get('/', interface.getInterface);

module.exports = router;