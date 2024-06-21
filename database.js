// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('blog.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  // Adicionar a coluna image1 se ela não existir
  db.all("PRAGMA table_info(posts);", (err, columns) => {
    if (err) {
      console.error('Erro ao obter informações da tabela:', err.message);
      return;
    }
    const columnExists = columns.some(column => column.name === 'image1');
    if (!columnExists) {
      db.run(`ALTER TABLE posts ADD COLUMN image1 TEXT;`, (err) => {
        if (err) {
          console.error('Erro ao adicionar a coluna image1:', err.message);
        } else {
          console.log('Coluna image1 adicionada com sucesso');
        }
      });
    }
  });
});

module.exports = db;
