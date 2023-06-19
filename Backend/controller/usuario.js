var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./database/data/streambox.db");

function inserir(req, res, next) {
  db.run(
    "INSERT INTO usuario (nome,email,senha,tipo) VALUES (?, ?, ? , ?)",
    [req.body.nome, req.body.email, req.body.senha, "U"],
    function (result, err) {
      if (err) {
        res.status(401).json({
          error: true,
          result: err,
        });
      }

      res.status(200).json({
        success: true,
        result: {
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha,
        },
      });
    }
  );
}

function listar(req, res, next) {
  db.all("SELECT * FROM usuario", [], function (err, rows) {
    if (err) {
      return next(err);
    }

    let usuarios = rows.map(function (row) {
      return {
        id: row.id_usuario,
        nome: row.nome,
        email: row.email,
      };
    });

    res.status(200).json({
      success: true,
      result: usuarios,
    });
  });
}

async function alterarStatusSerie (req, res, next) {
    var idUsuario = res.locals.usuario.id_usuario
    var statusSerie = await obterStatusSerieDB(req, idUsuario);
    if (statusSerie.result) {
        try {
            statusSerie = await alterarStatusSerieDB(req, idUsuario)     
            res.status(200).json({
                success: true,
                result: statusSerie.result
            });       
        } catch (error) {
            res.status(500).json({
                success: false,
                result: null
            });  
        }
        return;    
    } 

    try {
        statusSerie = await inserirStatusSerieDB(req, idUsuario)     
        res.status(200).json({
            success: true,
            result: statusSerie.result
        });       
    } catch (error) {
        res.status(500).json({
            success: false,
            result: null
        });  
    }
}

async function obterStatusSerie (req, res, next) {
    var idUsuario = res.locals.usuario.id_usuario
    try {
        statusSerie = await obterStatusSerieDB(req, idUsuario)     
        res.status(200).json({
            success: true,
            result: statusSerie.result
        });       
    } catch (error) {
        res.status(500).json({
            success: false,
            result: null
        });  
    }
}

async function obterSerie (req, res, next) {
    var idUsuario = res.locals.usuario.id_usuario
    try {
        statusSerie = await obterSerieDB(idUsuario)     
        res.status(200).json({
            success: true,
            result: statusSerie.result
        });       
    } catch (error) {
        res.status(500).json({
            success: false,
            result: null
        });  
    }
}

async function alterarStatusSerieDB(req, idUsuario) {
    return new Promise((resolve, reject) => { 
        db.run('UPDATE usuario_serie SET concluido = ?,quero_assistir = ?,assistindo = ?, nao_recomendo = ? WHERE id_usuario = ? AND id_serie = ?', [
            req.body.concluido,
            req.body.quero_assistir,
            req.body.assistindo,
            req.body.nao_recomendo,
            idUsuario,
            req.params.id,
        ], function (result, err) {
            if (err) { return reject(err); }

            return resolve(
                {
                    result: {
                        concluido: req.body.concluido,
                        quero_assistir: req.body.quero_assistir,
                        assistindo: req.body.assistindo,
                        nao_recomendo: req.body.nao_recomendo
                    }
                }
            );
        });
    });
}

async function inserirStatusSerieDB (req, idUsuario) {
    return new Promise((resolve, reject) => { 
        db.run('INSERT INTO usuario_serie (id_usuario, id_serie, concluido, quero_assistir, assistindo, nao_recomendo) VALUES (?, ?, ?, ?, ? , ?)', [
            idUsuario,
            req.params.id,
            req.body.concluido,
            req.body.quero_assistir,
            req.body.assistindo,
            req.body.nao_recomendo
        ], function (result, err) {
            if (err) { return reject(err); }
    
            return resolve(
                {
                    result: {
                        concluido: req.body.concluido,
                        quero_assistir: req.body.quero_assistir,
                        assistindo: req.body.assistindo,
                        nao_recomendo: req.body.nao_recomendo
                    }
                }
            );
        });
    });
}

async function obterStatusSerieDB (req, idUsuario) {
    return new Promise((resolve, reject) => { 
        db.get('SELECT * FROM usuario_serie WHERE id_serie = ? AND id_usuario = ?', [req.params.id, idUsuario], function(err, row) {
            if (err) { return reject(err); }

            var usuarioSerie = null;
            if (row) {
                usuarioSerie = {
                    id_usuario_serie: row.id_usuario_serie,
                    concluido: row.concluido,
                    quero_assistir: row.quero_assistir,
                    assistindo: row.assistindo,
                    nao_recomendo: row.nao_recomendo
                };
            }

            return resolve({
                result: usuarioSerie
            })
        });
    });
}

async function obterSerieDB (idUsuario) {
    return new Promise((resolve, reject) => { 
        db.all(
            "SELECT *  FROM usuario_serie INNER JOIN serie  ON (usuario_serie.id_serie = serie.id_serie) WHERE id_usuario = ?",
            [idUsuario],
            function (err, row) {
              if (err) {
                return reject(err);
              }
      
              var usuarioSerie = [];
              if (row) {
                row.map((item) => {
                  usuarioSerie.push({
                    id_usuario_serie: item.id_usuario_serie,
                    concluido: item.concluido,
                    quero_assistir: item.quero_assistir,
                    assistindo: item.assistindo,
                    nao_recomendo: item.nao_recomendo,
                    serie: {
                      nome: item.nome,
                      imagem: item.imagem,
                      id_serie: item.id_serie
                    },
                  });
                });
              }
      

            return resolve({
                result: usuarioSerie
            })
        });
    });
}



module.exports = {
    inserir,
    listar,
    obterStatusSerie,
    alterarStatusSerie,
    obterSerie
}
