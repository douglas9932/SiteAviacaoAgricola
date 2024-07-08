const { format, parseISO } = require('date-fns');
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



  app.get('/GetInfoEmpresa', (req, res) => {

    const query = 'SELECT * FROM TBEMPRESA';

    connection.query(query, (error, results) => {

    if (error) {
      res.status(500).json({ error: 'Erro ao Buscar Informações da empresa '});
      return;
    }

    if (results.length > 0) 
    { 
      res.json({ data: results });
    } else {
      res.json({ data: results });
    }      
    });
  });

  app.post('/SalvarInfoEmpresas', (req, res) => {

    try {

      const { parObjTBEMPRESA } = req.body;

      if (!parObjTBEMPRESA) {
        return res.status(400).json({ error: 'parObjTBEMPRESA is required' });
      }

      var query = ``;

      if(parObjTBEMPRESA.IDEMPRESA == undefined || parObjTBEMPRESA.IDEMPRESA == 0)
      {
        query = `INSERT INTO TBEMPRESA
                    (
                    NOMEFANTASIA,
                    RAZAOSOCIAL,
                    CNPJ,
                    INSCRICAOESTADUAL,
                    ENDERECO,
                    TELEFONE,
                    CELULAR,
                    DATAABERTURA,
                    SEGMENTO,
                    RESPONSAVEL,
                    CPFRESPONSAVEL,
                    EXTENSAO_LOGO_236X67,
                    LOGO_236X67,
                    EXTENSAO_ICONE,
                    ICONE,
                    DTCADASTRO,
                    DTALTERACAO,
                    IDSTATUSEMPRESA)
                    VALUES
                    (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    NOW(),
                    NOW(),
                    1)`;

        connection.query(query,
            [parObjTBEMPRESA.NOMEFANTASIA,
            parObjTBEMPRESA.RAZAOSOCIAL,
            parObjTBEMPRESA.CNPJ.replace(/[^a-zA-Z0-9]/g, ''),
            parObjTBEMPRESA.INSCRICAOESTADUAL.replace(/[^a-zA-Z0-9]/g, ''),
            parObjTBEMPRESA.ENDERECO,
            parObjTBEMPRESA.TELEFONE.replace(/[^a-zA-Z0-9]/g, ''),
            parObjTBEMPRESA.CELULAR.replace(/[^a-zA-Z0-9]/g, ''),
            format(parseISO(parObjTBEMPRESA.DATAABERTURA), 'yyyy-MM-dd'),
            parObjTBEMPRESA.SEGMENTO,
            parObjTBEMPRESA.RESPONSAVEL,
            parObjTBEMPRESA.CPFRESPONSAVEL.replace(/[^a-zA-Z0-9]/g, ''),
            parObjTBEMPRESA.EXTENSAO_LOGO_236X67,
            parObjTBEMPRESA.LOGO_236X67,
            parObjTBEMPRESA.EXTENSAO_ICONE,
            parObjTBEMPRESA.ICONE]
          , (error, results) => {   

              if (error) {
                res.status(500).json({ error: 'Erro ao Salvar Informações ', error});
                return;
              }
          
              if (results.length > 0) {    
                const insertedId = results.insertId;  
                res.json({ ID: insertedId, });
              } 
          
        });

      }else
      {
        query = `UPDATE TBEMPRESA
                    SET
                    NOMEFANTASIA = ?,
                    RAZAOSOCIAL = ?,
                    CNPJ = ?,
                    INSCRICAOESTADUAL = ?,
                    ENDERECO = ?,
                    TELEFONE = ?,
                    CELULAR = ?,
                    DATAABERTURA = ?,
                    SEGMENTO = ?,
                    RESPONSAVEL = ?,
                    CPFRESPONSAVEL = ?,
                    EXTENSAO_LOGO_236X67 = ?,
                    LOGO_236X67 = ?,
                    EXTENSAO_ICONE = ?,
                    ICONE = ?,
                    DTALTERACAO = NOW()
                    WHERE IDEMPRESA = ?`;
    
    
              connection.query(query,
                [ parObjTBEMPRESA.NOMEFANTASIA,
                  parObjTBEMPRESA.RAZAOSOCIAL,
                  parObjTBEMPRESA.CNPJ.replace(/[^a-zA-Z0-9]/g, ''),
                  parObjTBEMPRESA.INSCRICAOESTADUAL.replace(/[^a-zA-Z0-9]/g, ''),
                  parObjTBEMPRESA.ENDERECO,
                  parObjTBEMPRESA.TELEFONE.replace(/[^a-zA-Z0-9]/g, ''),
                  parObjTBEMPRESA.CELULAR.replace(/[^a-zA-Z0-9]/g, ''),
                  format(parseISO(parObjTBEMPRESA.DATAABERTURA), 'yyyy-MM-dd'),
                  parObjTBEMPRESA.SEGMENTO,
                  parObjTBEMPRESA.RESPONSAVEL,
                  parObjTBEMPRESA.CPFRESPONSAVEL.replace(/[^a-zA-Z0-9]/g, ''),
                  parObjTBEMPRESA.EXTENSAO_LOGO_236X67,
                  parObjTBEMPRESA.LOGO_236X67,
                  parObjTBEMPRESA.EXTENSAO_ICONE,
                  parObjTBEMPRESA.ICONE,                
                  parObjTBEMPRESA.IDEMPRESA]
                , (error, results) => {
          
                  if (error) {
                    res.status(500).json({ error: 'Erro ao Salvar Informações ', error});
                    return;
                  }
              
                  if (results.length > 0) {    
                    const insertedId = results.insertId;  
                    res.json({ ID: insertedId, });
                  } 
          
              });
      }
    }catch (erro)
    {
        console.log("Erro: "+ erro);
        throw erro;
    }
  });
  


















  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });