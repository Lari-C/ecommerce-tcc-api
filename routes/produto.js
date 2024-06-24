const router = require('express').Router();
const produtoController = require('../controller/produto');
const tokenController = require('../controller/token');

router.get('/', produtoController.get);
router.get('/:id', produtoController.getById);
router.get('/categoria/:id', produtoController.getByCategoria);
router.post('/', tokenController.verifyToken, produtoController.post);
router.delete('/:id', tokenController.verifyToken, produtoController.remove);
router.put('/', tokenController.verifyToken, produtoController.put);

module.exports = router;