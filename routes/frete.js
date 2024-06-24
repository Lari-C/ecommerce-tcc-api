const router = require('express').Router();
const freteController = require('../controller/frete');

router.post('/', freteController.post);
// router.get('/:id', produtoController.getById);
// router.get('/categoria/:id', produtoController.getByCategoria);
// router.post('/', tokenController.verifyToken, produtoController.post);
// router.delete('/:id', tokenController.verifyToken, produtoController.remove);
// router.put('/', tokenController.verifyToken, produtoController.put);

module.exports = router;