const db = require("../database/db");

const get = (async (req, res) =>{
    const q = "SELECT * FROM tb_categorias";
    db.query(q, (err, data) =>{
        if(err) return res.status(500).json(err.message); 
        return res.status(200).json(data);
    });
});

const getById = (async (req, res) =>{
    const categoriaId = req.params.id;
    const q = `SELECT * FROM tb_categorias WHERE id=${categoriaId}`;
    db.query(q, (err, data) =>{
        if(err) return res.status(500).json(err.message); 
        return data.length != 0 ? res.status(200).json(data) : res.status(204).json(data);
    });
});

const post = (async (req, res) => {
    const categoria = req.body;
    const q = `INSERT INTO tb_categorias (nome) VALUES ('${categoria.nome}')`;
    db.query(q, (err, data) =>{
        if(err) return res.status(500).json(err.message); 
        return res.status(201).json({result:"ok"});
    });
});

const remove = (async (req, res) => {
    const categoriaId = req.params.id;
    const q = `DELETE FROM tb_categorias WHERE id = ${categoriaId}`;
    db.query(q, (err, data) =>{
        if(err) return res.status(500).json(err.message); 
        return res.status(200).json({result:"ok"});
    });
})

const put = (async (req, res) => {
    const categoria = req.body;
    const q = `UPDATE tb_categorias SET nome = '${categoria.nome}' WHERE id = ${categoria.id}`;
    db.query(q, (err, data) =>{
        if(err) return res.status(500).json(err.message); 
        return res.status(201).json({result:"ok"});
    });
});

module.exports = {
    get,
    getById,
    post,
    remove,
    put
}