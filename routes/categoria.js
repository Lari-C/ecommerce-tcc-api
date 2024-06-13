const router = require('express').Router();
const categoriaController = require('../controller/categoria');
//const authController = require('../controller/authentication');

router.get('/', categoriaController.get);
router.get('/:id', categoriaController.getById);
router.post('/', categoriaController.post);
router.delete('/:id', categoriaController.remove);
router.put('/', categoriaController.put);

module.exports = router;