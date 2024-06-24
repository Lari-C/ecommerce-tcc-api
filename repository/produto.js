const db = require("../database/db");

const get = (async (callback) =>{
    const q = "SELECT * FROM tb_produtos";
    db.query(q, (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const getById = (async (id, callback) =>{
    const q = `SELECT * FROM tb_produtos WHERE id=?`;
    db.query(q, [id], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const getByCategoria = (async (id, callback) =>{
    const q = `SELECT p.* FROM tb_produtos p
        INNER JOIN tb_produtos_categorias pc ON pc.id_produto = p.id 
        WHERE pc.id_categoria = ?`;
    db.query(q, [id], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const create = (async (produto, callback) =>{
    const q = `INSERT INTO tb_produtos (nome, preco, observacao, card_img, detail_img, peso, estoque) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(q, [produto.nome, produto.preco, produto.observacao, produto.card_img, produto.detail_img, produto.peso, produto.estoque], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const update = (async (produto, callback) =>{
    const q = `UPDATE tb_produtos SET nome = ?, preco = ?, observacao = ?, card_img = ?, detail_img = ?, peso = ?, estoque = ? WHERE id = ?`;
    db.query(q, [produto.nome, produto.preco, produto.observacao, produto.card_img, produto.detail_img, produto.peso, produto.estoque, produto.id], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const remove = (async (id, callback) =>{
    const q = `DELETE FROM tb_produtos WHERE id = ?`;
    db.query(q, [id], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});


module.exports = {
    get,
    getById,
    getByCategoria,
    create,
    update,
    remove
}