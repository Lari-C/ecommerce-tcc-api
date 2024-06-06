const db = require("../database/db");

const get = (async (req, res) =>{
    const q = "SELECT * FROM tb_produtos";
    db.query(q, (err, data) =>{
        if(err) return res.status(500).json(err.message); 
        return res.status(200).json(data);
    });
});

const getById = (async (req, res) =>{
    const produtoId = req.params.id;
    const q = `SELECT * FROM tb_produtos WHERE id=${produtoId}`;
    db.query(q, (err, data) =>{
        if(err) return res.status(500).json(err.message); 
        return data.length != 0 ? res.status(200).json(data) : res.status(204).json(data);
    });
});

const getByCategoria = (async (req, res) =>{
    console.log(req.params.id)
    const categoriaId = req.params.id;
    const q = `SELECT * FROM tb_produtos WHERE id_categoria=${categoriaId}`;
    db.query(q, (err, data) =>{
        if(err) return res.status(500).json(err.message); 
        return data.length != 0 ? res.status(200).json(data) : res.status(204).json(data);
    });
});

const post = (async (req, res) => {
    const produto = req.body;
    const q = `INSERT INTO tb_produtos (nome, preco, observacao, imagem, id_categoria) VALUES ('${produto.nome}', ${produto.preco}, '${produto.observacao}', '${produto.imagem}', '${produto.id_categoria}')`;
    db.query(q, (err, data) =>{
        if(err) return res.status(500).json(err.message); 
        return res.status(201).json({result:"ok"});
    });
});

const remove = (async (req, res) => {
    const produtoId = req.params.id;
    const q = `DELETE FROM tb_produtos WHERE id = ${produtoId}`;
    db.query(q, (err, data) =>{
        if(err) return res.status(500).json(err.message); 
        return res.status(200).json({result:"ok"});
    });
})

const put = (async (req, res) => {
    const produto = req.body;
    const q = `UPDATE tb_produtos SET nome = '${produto.nome}', preco = ${produto.preco}, observacao = '${produto.observacao}', imagem = '${produto.imagem}', id_categoria = '${produto.id_categoria}' WHERE id = ${produto.id}`;
    db.query(q, (err, data) =>{
        if(err) return res.status(500).json(err.message); 
        return res.status(201).json({result:"ok"});
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