var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/data/streambox.db');

const authMiddleware = async (req, res, next)=>{
    const email = req.query.email
    const senha = req.query.senha

    res.locals.usuario = await obterUsuario(email, senha);
    
    if(res.locals.usuario) {
        next();
    } else {
        res.status(401).send("Access Denied");
    }
}

const authMiddlewareAdmin = async (req, res, next)=>{
    const email = req.query.email
    const senha = req.query.senha

    res.locals.usuario = await obterUsuario(email, senha);

    if(res.locals.usuario && res.locals.usuario.tipo == 'A') {
        next();
    } else {
        res.status(401).send("Access Denied");
    }
    
}

const obterUsuario = async (email, senha) => {
    return new Promise((resolve, reject) => { 
        var row = db.get("SELECT id_usuario, nome ,email, senha, tipo FROM usuario where email = ? AND senha = ?" , [
            email,
            senha
        ], (err, row) => { 
            if (err) {
              return reject(err.message);
            }

            return resolve(row);
        }
        );
    });
}

module.exports = {
    authMiddleware,
    authMiddlewareAdmin
};