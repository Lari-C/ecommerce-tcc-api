const router = require('express').Router();
const usuarioController = require('../controller/usuario');
const tokenController = require('../controller/token');

router.get('/', tokenController.verifyToken, usuarioController.getByEmail);
router.post('/', usuarioController.post);
router.put('/', tokenController.verifyToken, usuarioController.put);
router.delete('/', tokenController.verifyToken, usuarioController.remove);

module.exports = router;