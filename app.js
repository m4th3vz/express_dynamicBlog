// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 3000;

// Configurar o diretório de views e o mecanismo de template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware para servir arquivos estáticos (opcional)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Importar e usar as rotas
const indexRoutes = require('./routes/index');

// Usando o roteador para a rota principal
app.use('/', indexRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

