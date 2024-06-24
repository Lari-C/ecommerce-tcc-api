const categoriaRepository = require('../repository/categoria');

const get = (async (req, res) =>{
    await categoriaRepository.get((data, err) => {
        if(err) return res.status(500).json(err.message); 
        return res.status(200).json(data);
    })
});

const getById = (async (req, res) =>{
    const categoriaId = req.params.id;
    await categoriaRepository.getById(categoriaId, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        return data.length != 0 ? res.status(200).json(data) : res.status(204).json(data);
    });
});

const post = (async (req, res) => {
    if(!req.userADM) return res.status(401).json();
    const categoria = req.body;
    await categoriaRepository.create(categoria, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        return res.status(201).json();
    })
});

const put = (async (req, res) => {
    if(!req.userADM) return res.status(401).json();
    const categoria = req.body;
    await categoriaRepository.update(categoria, (data, err) =>{
        if(err) return res.status(500).json(err.message); 
        return res.status(201).json();
    });
});

const remove = (async (req, res) => {
    if(!req.userADM) return res.status(401).json();
    const categoriaId = req.params.id;
    await categoriaRepository.remove(categoriaId, (data, err) => {
        if(err) return res.status(500).json(err.message); 
        return res.status(200).json();
    });
});

module.exports = {
    get,
    getById,
    post,
    remove,
    put
}