const db = require("../database/db");

const getByEmail = (async (email, callback) =>{
    const q = `SELECT * FROM tb_usuarios WHERE email=? LIMIT 1`;
    db.query(q, [email], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const create = (async (usuario, callback) =>{
    const q = `INSERT INTO tb_usuarios (nome, email, telefone, senha, adm) VALUES (?, ?, ?, ?, ?)`;
    db.query(q, [usuario.nome, usuario.email, usuario.telefone, usuario.senha, false], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const update = (async (usuario, callback) =>{
    const q = `UPDATE tb_usuarios SET nome = ?, email = ?, telefone = ?, senha = ? WHERE id = ?`;
    db.query(q, [usuario.nome, usuario.email, usuario.telefone, usuario.senha, usuario.id], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});

const remove = (async (id, callback) =>{
    const q = `DELETE FROM tb_usuarios WHERE id = ?`;
    db.query(q, [id], (err, data) =>{
        if(err) return callback(err); 
        return callback(data);
    });
});


module.exports = {
    getByEmail,
    create,
    update,
    remove
}