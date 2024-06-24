const enderecoRepository = require('../repository/endereco');

const get = (async (req, res) =>{
    const usuarioId = req.params.id;
    await enderecoRepository.get(usuarioId, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        return res.status(200).json(data);
    });
});

const post = (async (req, res) => {
    const endereco = req.body;
    await enderecoRepository.create(endereco, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        return res.status(201).json();
    });
});


const remove = (async (req, res) => {
    const enderecoId = req.params.id;
    await enderecoRepository.remove(enderecoId, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        return res.status(200).json();
    });
});

module.exports = {
    get,
    post,
    remove,
}