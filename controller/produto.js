const produtoRepository = require('../repository/produto');

const get = (async (req, res) =>{
    await produtoRepository.get((data, err) => {
        if(err) return res.status(500).json(err.message); 
        return res.status(200).json(data);
    });
});

const getById = (async (req, res) =>{
    const produtoId = req.params.id;
    await produtoRepository.getById(produtoId, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        return data.length != 0 ? res.status(200).json(data) : res.status(204).json(data);
    });
});

const getByCategoria = (async (req, res) =>{
    const categoriaId = req.params.id;
    await produtoRepository.getByCategoria(categoriaId, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        return data.length != 0 ? res.status(200).json(data) : res.status(204).json(data);
    });
});

const post = (async (req, res) => {
    if(!req.userADM) return res.status(401).json();
    const produto = req.body;
    await produtoRepository.create(produto, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        return res.status(201).json();
    });
});

const put = (async (req, res) => {
    if(!req.userADM) return res.status(401).json();
    const produto = req.body;
    await produtoRepository.update(produto, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        return res.status(201).json();
    });
});

const remove = (async (req, res) => {
    if(!req.userADM) return res.status(401).json();
    const produtoId = req.params.id;
    await produtoRepository.remove(produtoId, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        return res.status(200).json();
    });
});

module.exports = {
    get,
    getById,
    getByCategoria,
    post,
    remove,
    put
}