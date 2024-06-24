const router = require('express').Router();
const categoriaController = require('../controller/categoria');
const tokenController = require('../controller/token');

router.get('/', categoriaController.get);
router.get('/:id', categoriaController.getById);
router.post('/', tokenController.verifyToken, categoriaController.post);
router.delete('/:id', tokenController.verifyToken, categoriaController.remove);
router.put('/', tokenController.verifyToken, categoriaController.put);

module.exports = router;