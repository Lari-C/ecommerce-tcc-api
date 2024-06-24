const express = require('express')
const router = express.Router()
const tokenController = require('../controller/token')

router.post('/', tokenController.generateToken);
router.get('/', tokenController.isAuth);

module.exports = router;