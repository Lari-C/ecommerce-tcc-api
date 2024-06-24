const express = require('express')
const router = express.Router()
const enderecoController = require('../controller/endereco')

router.post('/', enderecoController.post);
router.get('/:id', enderecoController.get);
router.delete('/:id', enderecoController.remove);

module.exports = router;