const db = require("../database/db");

const get = (async (callback) =>{
    const q = `SELECT DISTINCT tc.* FROM tb_categorias tc
        INNER JOIN tb_produtos_categorias tpc ON tpc.id_categoria = tc.id `;
    db.query(q, (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const getById = (async (id, callback) =>{
    const q = `SELECT * FROM tb_categorias WHERE id=?`;
    db.query(q, [id], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const create = (async (categoria, callback) =>{
    const q = `INSERT INTO tb_categorias (nome) VALUES (?)`;
    db.query(q, [categoria.nome], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const update = (async (categoria, callback) =>{
    const q = `UPDATE tb_categorias SET nome = ? WHERE id = ?`;
    db.query(q, [categoria.nome, categoria.id], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const remove = (async (id, callback) =>{
    const q = `DELETE FROM tb_categorias WHERE id = ?`;
    db.query(q, [id], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});


module.exports = {
    get,
    getById,
    create,
    update,
    remove
}