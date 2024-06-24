const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repository/usuario');

async function generateToken(req, res) {
    try {
        const user = req.body;
        usuarioRepository.getByEmail(user.email, (userFromDB) => {
            userFromDB = userFromDB[0];
            if (userFromDB === null || userFromDB === undefined){
                return res.status(401).json({err:'Conta não cadastrada!'});
            }
            else if(user.email === userFromDB.email && bcrypt.compareSync(user.senha, userFromDB.senha)){
                const token = jwt.sign({userId: userFromDB.id, userEmail: userFromDB.email, userADM: userFromDB.adm}, process.env.SECRET, {expiresIn: 7200});
                return res.json({auth: true, token, userId: userFromDB.id, nome: userFromDB.nome, adm: userFromDB.adm});
            }
            else if (user.senha !== userFromDB.senha){
                return res.status(401).json({err:'Senha inválida, tente novamente!'});
            }
            return res.status(401).json({err:'Erro ao realizar login!'});
        });
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message)
    }
}

async function verifyToken(req, res, next) {
    try {
        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.SECRET, (err, decoded) =>{
            if(err) 
                return res.status(401).send();
            req.userId = decoded.userId;
            req.userEmail = decoded.userEmail;
            req.userADM = decoded.userADM;
            next();
        });
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message)
    }
}

async function isAuth(req, res, next) {
    try {
        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.SECRET, (err, decoded) =>{
            if(err) 
                return res.status(401).json({auth: false});
            res.status(200).json({auth: true});
        });
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message)
    }
}

module.exports = {
    generateToken,
    verifyToken,
    isAuth
}