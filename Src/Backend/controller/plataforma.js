var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/data/streambox.db');

function inserir (req, res, next)  {
    db.run('INSERT INTO plataforma (nome, imagem) VALUES (?, ?)', [
      req.body.nome,
      req.body.imagem
    ], function(result, err) {
      if (err) { return next(err); }

      res.status(200).json({
        success: true,
        result: {
            nome: req.body.nome,
            imagem: req.body.imagem
        }
      });
    });
}

function atualizar (req, res, next)  {
    console.log(req.params.id)
    db.run('UPDATE plataforma SET nome = ?, imagem = ? WHERE id_plataforma = ?', [
      req.body.nome,
      req.body.imagem,
      req.params.id
    ], function(result, err) {
      if (err) { return next(err); }

      res.status(200).json({
        success: true,
        result: {
            nome: req.body.nome,
            imagem: req.body.imagem
        }
      });
    });
}

function listar (req, res, next)  {
    db.all('SELECT * FROM plataforma', [], function(err, rows) {
        if (err) { return next(err); }
        
        var plataformas = rows.map(function(row) {
          return {
            id_plataforma: row.id_plataforma,
            nome: row.nome,
            imagem: row.imagem
          }
        });

        res.status(200).json({
            success: true,
            result: plataformas
        });
    });
}
function deletar(req, res, next) {
  console.log(req.params.id);
  db.run(`DELETE FROM plataforma WHERE id_plataforma  = ?`, [req.params.id], function(err) {
    if (err) {
      return next(err);
    }

    res.status(200).json({
      success: true,
      result: {
        id: req.params.id
      }
    });
  });
}


function item(req, res, next) {
  db.get('SELECT * FROM plataforma WHERE id_plataforma = ?', [req.params.id], function(err, row) {
 
    if (!row) {
      return res.status(404).json({ error: 'Item não  Econtrado' });
    }

    var plataforma = {
      id_plataforma: row.id_plataforma,
      nome: row.nome,
      imagem: row.imagem
    };

    res.status(200).json({
      success: true,
      result: plataforma
    });
  });
}



module.exports = {
    inserir,
    listar,
    atualizar,
    deletar,
    item
}
