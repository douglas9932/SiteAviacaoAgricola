const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const port = 3001;


  app.use(express.json());
  app.use(cors());

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

  app.post('/ValidarLogin', (req, res) => {

    const { parLogin, parSenha } = req.body;

    const query = 'SELECT * FROM TBUSUARIOS WHERE NMLOGIN = ? AND SENHA = ?';

    connection.query(query, [parLogin, parSenha], (error, results) => {

    if (error) {
      res.status(500).json({ error: 'Erro ao Validar Usuário ' + parLogin + " - "+ parSenha});
      return;
    }

    if (results.length > 0) {
      const SECRET_KEY = 'your_secret_key';
      const token = jwt.sign({ parLogin, parSenha }, SECRET_KEY, { expiresIn: '24h' });

      res.json({ valid: true, message: 'Login válido!', userToken: token  });
    } else {
      res.json({ valid: false, message: 'Nome ou senha inválidos.' });
    }
      
    });
  });

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });