const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TescaroSoft',
  database: 'db_stoll'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados.');
});

app.get('/TestarConexaoComBanco', (req, res) => {
  connection.query('SELECT 1 + 1 AS TESTE', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});