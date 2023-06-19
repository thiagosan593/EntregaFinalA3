const router = require('express').Router();

const { authMiddleware, authMiddlewareAdmin } = require('./authMiddleware');

const plataforma = require('./../controller/plataforma');
const serie = require('./../controller/serie');
const imagem = require('./../controller/imagem');
const usuario = require('./../controller/usuario');

router.get('/login', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    result: res.locals.usuario
  });
})

// PLATAFORMA
router.get('/plataforma', authMiddlewareAdmin, plataforma.listar)
router.post('/plataforma', authMiddlewareAdmin, plataforma.inserir)
router.put('/plataforma/:id(\\d+)', authMiddlewareAdmin, plataforma.atualizar)
router.delete('/plataforma/:id(\\d+)', authMiddlewareAdmin, plataforma.deletar)
router.get('/plataforma/:id(\\d+)', authMiddlewareAdmin, plataforma.item)

// SERIES
router.get('/serie', serie.listar)
router.post('/serie', authMiddlewareAdmin, serie.inserir)
router.get('/serie/:id(\\d+)/plataforma', authMiddlewareAdmin, serie.obterPlataformaSerie)
router.put('/serie/:id(\\d+)/plataforma', authMiddlewareAdmin, serie.inserirPlataformaSerie)
router.delete('/serie/:id(\\d+)/plataforma/:id_plataforma(\\d+)', authMiddlewareAdmin, serie.deletarPlataformaSerie)
router.put('/serie/:id(\\d+)', authMiddlewareAdmin, serie.atualizar)
router.delete('/serie/:id(\\d+)', authMiddlewareAdmin, serie.deletar)
router.get('/serie/:id(\\d+)', authMiddleware, serie.item)


//Usuario 
router.post('/usuario', usuario.inserir)
router.get('/usuario', usuario.listar)
router.get('/usuario/serie/:id(\\d+)', authMiddleware, usuario.obterStatusSerie)
router.get('/usuario/listeserie', authMiddleware, usuario.obterSerie)
router.put('/usuario/serie/:id(\\d+)', authMiddleware, usuario.alterarStatusSerie)

//Imagem
router.post('/imagem', authMiddlewareAdmin, imagem.inserir) // inseri imagens
router.post('/imagem', authMiddlewareAdmin, imagem.inserir) // inseri imagens


module.exports = router;