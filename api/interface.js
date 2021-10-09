const router = require('express').Router();
const { interface } = require('../controllers/')

router.get('/', interface.getInterfaceSettings);
router.put('/', interface.updateInterfaceSettings);

module.exports = router;