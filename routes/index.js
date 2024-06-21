// routes/index.js
const express = require('express');
const router = express.Router();
const db = require('../database');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rota principal
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Rota principal para listar textos
router.get('/listText', (req, res) => {
  db.all('SELECT * FROM posts ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('listText', { title: 'Lista de Textos', posts: rows });
  });
});

// Rota para exibir o formulário de criação de texto
router.get('/postText', (req, res) => {
  res.render('postText', { title: 'Novo Texto' });
});

// Rota para processar o formulário de criação de texto
router.post('/postText', upload.single('image1'), (req, res) => {
  const { title, content } = req.body;
  const image1 = req.file ? `/uploads/${req.file.filename}` : null;

  db.run('INSERT INTO posts (title, content, image1) VALUES (?, ?, ?)', [title, content, image1], function(err) {
    if (err) {
      return console.error(err.message);
    }
    res.redirect('/');
  });
});

// Rota para exibir um texto específico
router.get('/post/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('detailText', { title: row.title, post: row });
  });
});

module.exports = router;
