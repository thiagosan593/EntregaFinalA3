const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
  }
})

const parser = multer({ storage: storage })

function inserir (req, res, next)  {
  parser.single('imagem')(req, res, err => {
    if (err)
        res.status(500).json({ error: 1, payload: err });
    else {
        const image = {};
        image.id = req.file.filename;
        image.url = `/uploads/${image.id}`;
        res.status(200).json({ error: 0, payload: { id: image.id, url: image.url } });
    }
});
}

module.exports = {
    inserir
}
