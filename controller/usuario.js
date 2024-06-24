const bcrypt = require('bcrypt');
const usuarioRepository = require('../repository/usuario');

const getByEmail = (async (req, res) =>{
    const email = req.body.email;
    usuarioRepository.getByEmail(email, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        return data.length != 0 ? res.status(200).json(data) : res.status(204).json(data);
    });
});

const post = (async (req, res) => {
    req.body.senha = await bcrypt.hash(req.body.senha, 10);
    const usuario = req.body;
    usuarioRepository.create(usuario, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        if(data.code == "ER_DUP_ENTRY")
            return res.status(400).json({result:"Já existe uma conta vinculada a este email."});
        return res.status(201).json({result:"ok"});
    })
});

const remove = (async (req, res) => {
    const usuarioId = req.body.id;
    usuarioRepository.remove(usuarioId, (data, err) =>{
        if(err) return res.status(500).json(err.message); 
        return res.status(200).json({result:"ok"});
    })
})

const put = (async (req, res) => {
    req.body.senha = bcrypt.hash(req.body.senha, 10);
    const usuario = req.body;
    usuarioRepository.update(usuario, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        return res.status(201).json({result:"ok"});
    })
});

module.exports = {
    getByEmail,
    post,
    remove,
    put
}