const router = require('express').Router();
const produtoController = require('../controller/produto');
//const authController = require('../controller/authentication');

router.get('/', produtoController.get);
router.get('/:id', produtoController.getById);
router.get('/categoria/:id', produtoController.getByCategoria);
router.post('/', produtoController.post);
router.delete('/:id', produtoController.remove);
router.put('/', produtoController.put);

module.exports = router;