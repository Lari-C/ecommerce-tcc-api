const db = require("../database/db");

const get = (async (usuarioId, callback) =>{
    const q = `SELECT * FROM tb_enderecos
        WHERE id_usuario = ?`;
    db.query(q, [usuarioId], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const create = (async (endereco, callback) =>{
    const q = `INSERT INTO tb_enderecos (id_usuario, rua, numero, bairro, complemento, cidade, cep) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(q, [endereco.id_usuario, endereco.rua, endereco.numero, endereco.bairro, endereco.complemento, endereco.cidade, endereco.cep], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const remove = (async (id, callback) =>{
    const q = `DELETE FROM tb_enderecos WHERE id = ?`;
    db.query(q, [id], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});


module.exports = {
    get,
    create,
    remove
}