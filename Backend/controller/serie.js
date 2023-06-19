var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/data/streambox.db');


function inserir(req, res, next) {
  db.run('INSERT INTO serie (nome,imagem,lancamento,pais_origem,temporadas,episodios,status,sobre) VALUES (?, ?, ?,?,?,?,?,?)', [
    req.body.nome,
    req.body.imagem,
    req.body.lancamento,
    req.body.pais_origem,
    req.body.temporadas,
    req.body.episodios,
    req.body.status,
    req.body.sobre,
  ], function (result, err) {
    if (err) { return next(err); }

    res.status(200).json({
      success: true,
      result: {
        id: this.lastID,
        nome: req.body.nome,
        imagem: req.body.imagem,
        lancamento: req.body.lancamento,
        pais_origem: req.body.pais_origem,
        tempordas: req.body.temporadas,
        episodios: req.body.episodios,
        status: req.body.status,
        sobre: req.body.sobre,

      }
    });
  });
}

async function inserirPlataformaSerie(req, res, next) {
  var plataformaSerie = await obterPlataformaSerieDB(req.params.id, req.body.id_plataforma);

  if (!plataformaSerie.result) {
    try {
      plataformaSerie = await inserirPlataformaSerieDB(req)
      res.status(200).json({
        success: true,
        result: plataformaSerie.result
      });
      return
    } catch (error) {
      res.status(500).json({
        success: false,
        result: null
      });
      return
    }
  }

  res.status(200).json({
    success: true,
    result: plataformaSerie.result
  });
}

async function deletarPlataformaSerie(req, res, next) {
  var plataformaSerie = await obterPlataformaSerieDB(req.params.id, req.params.id_plataforma);

  if (!plataformaSerie.result) {
    res.status(404).json({
      success: false,
      result: {
        id_plataforma: req.params.id_plataforma
      }
    });
    return
  }
  db.run(`DELETE FROM serie_plataforma WHERE id_serie = ? AND id_plataforma = ?`, [req.params.id, req.params.id_plataforma], function (err) {
    if (err) {
      return next(err);
    }

    res.status(200).json({
      success: true,
      result: {
        id_plataforma: req.params.id_plataforma
      }
    });
  });
}

function obterPlataformaSerie(req, res, next) {
  db.all('SELECT sp.id_plataforma, nome, imagem FROM serie_plataforma sp LEFT JOIN plataforma f ON sp.id_plataforma = f.id_plataforma WHERE sp.id_serie = ?', [req.params.id], function (err, rows) {
    if (err) { return next(err); }

    var plataformas = rows.map(function (row) {
      console.log(row)
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

function atualizar(req, res, next) {
  db.run('UPDATE serie SET nome = ?,imagem = ?,lancamento = ?,pais_origem = ?,temporadas = ?,episodios = ?,status =?,sobre = ? WHERE id_serie = ?', [
    req.body.nome,
    req.body.imagem,
    req.body.lancamento,
    req.body.pais_origem,
    req.body.temporadas,
    req.body.episodios,
    req.body.status,
    req.body.sobre,
    req.params.id
  ], function (result, err) {
    if (err) { return next(err); }

    res.status(200).json({
      success: true,
      result: {
        nome: req.body.nome,
        imagem: req.body.imagem,
        lancamento: req.body.lancamento,
        pais_origem: req.body.pais_origem,
        tempordas: req.body.temporadas,
        episodios: req.body.episodios,
        status: req.body.status,
        sobre: req.body.sobre,
        id: req.body.id

      }
    });
  });
}

function listar(req, res, next) {
  db.all('SELECT * FROM serie', [], function (err, rows) {
    if (err) { return next(err); }

    var series = rows.map(function (row) {
      return {
        id: row.id_serie,
        nome: row.nome,
        imagem: row.imagem,
        lancamento: row.lancamento,
        pais_origem: row.pais_origem,
        tempordas: row.temporadas,
        episodios: row.episodios,
        status: row.status,
        sobre: row.sobre,

      }
    });

    res.status(200).json({
      success: true,
      result: series
    });
  });
}

function deletar(req, res, next) {
  db.run(`DELETE FROM serie WHERE id_serie  = ?`, [req.params.id], function (err) {
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
  db.get('SELECT * FROM serie WHERE id_serie = ?', [req.params.id], function (err, row) {

    if (!row) {
      return res.status(404).json({ error: 'Item não  Econtrado' });
    }
    db.all('SELECT * FROM serie_plataforma INNER JOIN plataforma  ON (serie_plataforma.id_plataforma = plataforma.id_plataforma) WHERE id_serie  = ? ', [req.params.id], function (err, row_plataforma) {
      var serie = {
        id: row.id_serie,
        nome: row.nome,
        imagem: row.imagem,
        lancamento: row.lancamento,
        pais_origem: row.pais_origem,
        temporadas: row.temporadas,
        episodios: row.episodios,
        status: row.status,
        sobre: row.sobre,
        disponivel: row_plataforma
  
      };
  
      res.status(200).json({
        success: true,
        result: serie
      });
    })
  });
}

async function inserirPlataformaSerieDB(req) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO serie_plataforma (id_serie, id_plataforma) VALUES (?, ?)', [
      req.params.id,
      req.body.id_plataforma
    ], function (result, err) {
      if (err) { return reject(err); }

      return resolve(
        {
          result: {
            id_plataforma: req.body.id_plataforma,
            id_serie: req.params.id
          }
        }
      );
    });
  });
}

async function obterPlataformaSerieDB(id, id_plataforma) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM serie_plataforma WHERE id_serie = ? AND id_plataforma = ?', [id, id_plataforma], function (err, row) {
      if (err) { return reject(err); }

      var plataformaSerie = null;
      if (row) {
        plataformaSerie = {
          id_plataforma: row.id_plataforma,
          id_serie: row.id_serie
        };
      }

      return resolve({
        result: plataformaSerie
      })
    });
  });
}

module.exports = {
  inserir,
  listar,
  atualizar,
  deletar,
  item,
  inserirPlataformaSerie,
  deletarPlataformaSerie,
  obterPlataformaSerie
}