const { format, parseISO } = require('date-fns');
const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const port = 32322;


  // app.use(express.json());
  app.use(cors());
  app.use(express.json({ limit: '50mb' })); // Aumente o limite conforme necessário
  app.use(express.urlencoded({ limit: '50mb', extended: true })); // Para dados de formulários

  let connection

  const AbrirConexao = ()=>{

    if(!connection || connection?._closing)
    {
      connection = mysql.createConnection({
        // host: 'localhost',
        // user: 'root',
        // password: 'TescaroSoft',
        // database: 'db_stoll',
        
        
        host: '193.203.175.85',
        user: 'u156150556_root',
        password: 'Root_Stoll12345',
        database: 'u156150556_DB_STOLL',
    
        keepAliveInitialDelay: 10000, // 0 by default.
        enableKeepAlive: true, // false by default
        waitForConnections: true,
    
        // connectionLimit: 50,
        // queueLimit: 0  
        connectTimeout: 10000
      });
    }


  }
  
  const FecharConexao= () =>{
    
    if(connection)
    {
      connection.end();
    }
  }

  AbrirConexao();

  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err.stack);
      return;
    }
    console.log('Conectado ao banco de dados.');
    
    return;
  });

  app.get('/TestarConexaoComBanco', (req, res) => {
    try{

      AbrirConexao();
      connection.query('SELECT 1 + 1 AS TESTE', (error, results) => {
      
        if (error) {
          res.status(500).json({ error: 'Erro ao buscar usuários', mensagem: error});
          return;
        }

        if (results.length > 0) 
        { 
          res.json({ data: true });
          return;
        } else {
          res.json({ data: false });
          return;
        }
      });

    }catch (erro)
    {
        console.log("Erro: "+ erro);
        throw erro;
    }finally{
      FecharConexao()
    }
  });

  app.post('/ValidarLogin', (req, res) => {
    try {
      AbrirConexao();

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
          return;
          
        } else {
          res.json({ valid: false, message: 'Nome ou senha inválidos.' });
          return;
        }
        
      });
    }catch (erro)
    {
      console.log("Erro: "+ erro);
      throw erro;
    }finally{
      FecharConexao()
    }
  });

  app.get('/GetInfoEmpresa', (req, res) => {
    try {
      AbrirConexao();
      const query = 'SELECT * FROM TBEMPRESA';
  
      connection.query(query, (error, results) => {
      
      if (error) {
        res.status(500).json({ error: 'Erro ao Buscar Informações da empresa '});
        return;
      }
  
      if (results.length > 0) 
      { 
        res.json({ data: results });
        return;
      } else {
        res.json({ data: results });
        return;
      }      
      });   
    }catch (erro)
    {
        console.log("Erro: "+ erro);
        throw erro;
    }finally{
      FecharConexao()
    }
  });

  app.post('/SalvarInfoEmpresas', (req, res) => {

    try {
      AbrirConexao();

      let { parObjTBEMPRESA } = req.body;

      if (!parObjTBEMPRESA) {
        return res.status(400).json({ error: 'parObjTBEMPRESA is required' });
      }
      else{
        parObjTBEMPRESA = JSON.parse(decodeURIComponent(escape(atob(parObjTBEMPRESA))));
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
            decodeURIComponent(escape(atob(parObjTBEMPRESA.LOGO_236X67 ?? ""))) ?? "",
            parObjTBEMPRESA.EXTENSAO_ICONE,
            decodeURIComponent(escape(atob(parObjTBEMPRESA.ICONE ?? ""))) ?? ""]
          , (error, results) => {   
          
              if (error) {
                res.status(500).json({ error: 'Erro ao Salvar Informações ', error});
                return;
              }
          
              if (results.length > 0) {    
                const insertedId = results.insertId;  
                res.json({ ID: insertedId, });
                return;
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
                  decodeURIComponent(escape(atob(parObjTBEMPRESA.LOGO_236X67 ?? ""))) ?? "",
                  parObjTBEMPRESA.EXTENSAO_ICONE,
                  decodeURIComponent(escape(atob(parObjTBEMPRESA.ICONE ?? ""))) ?? "",                
                  parObjTBEMPRESA.IDEMPRESA]
                , (error, results) => {

                  if (error) {
                    res.status(500).json({ error: 'Erro ao Salvar Informações ', error});
                    return;
                  }
              
                  if (results.changedRows > 0) {    
                    const insertedId = results.changedRows;  
                    res.json({ ID: insertedId, });
                    return;
                  }           
              });
      }
    }catch (erro)
    {
        console.log("Erro: "+ erro);
        throw erro;
    }finally{
      FecharConexao()
    }
  });
  

  app.get('/GetImagensCarousel', (req, res) => {
    try {
      AbrirConexao();
      const query = 'SELECT * FROM TBIMAGENSCAROUSEL WHERE IDSTATUSIMAGEM <> 18'; //18 Situação Deletado!
  
      connection.query(query, (error, results) => {
      
      if (error) {
        res.status(500).json({ error: 'Erro ao Buscar Imagens '});
        return;
      }
  
      if (results.length > 0) 
      { 
        res.json({ data: results });
        return;
      } else {
        res.json({ data: results });
        return;
      }      
      });   
    }catch (erro)
    {
        console.log("Erro: "+ erro);
        throw erro;
    }finally{
      FecharConexao()
    }
  });


  app.post('/ValidarSeNomeImagemCarouselExist', (req, res) => {
    try {
      AbrirConexao();

      const { parNomeImagem, parIDIMAGEM } = req.body;

      const query = 'SELECT COUNT(NOMEIMAGEM) AS Existe FROM TBIMAGENSCAROUSEL WHERE NOMEIMAGEM = ? AND IDIMAGEM <> ? AND IDSTATUSIMAGEM <> 18 '; //18 Situação Deletado!
  
      connection.query(query, [parNomeImagem, parIDIMAGEM], (error, results) => {
      
      if (error) {
        res.status(500).json({ error: 'Erro ao Buscar Imagens '});
        return;
      }
  
      if (results.length > 0) 
      { 
        res.json({ data: results.Existe > 0 });
        return;
      } else {
        res.json({ data: false });
        return;
      }      
      });   
    }catch (erro)
    {
        console.log("Erro: "+ erro);
        throw erro;
    }finally{
      FecharConexao()
    }
  });

  app.post('/SalvarImagemCarousel', (req, res) => {

    try {
      AbrirConexao();

      let { parObjTBIMAGENSCAROUSEL } = req.body;

      if (!parObjTBIMAGENSCAROUSEL) {
        return res.status(400).json({ error: 'parObjTBIMAGENSCAROUSEL is required' });
      }
      else{
        parObjTBIMAGENSCAROUSEL = JSON.parse(decodeURIComponent(escape(atob(parObjTBIMAGENSCAROUSEL))));
      }
      
      var query = ``;

      if(parObjTBIMAGENSCAROUSEL.IDIMAGEM == undefined || parObjTBIMAGENSCAROUSEL.IDIMAGEM == 0)
      {
        query = `INSERT INTO TBIMAGENSCAROUSEL
                    (
                    NOMEIMAGEM,
                    SCRIMAGEM,
                    DTCADASTRO,
                    DTALTERACAO,
                    IDSTATUSIMAGEM)
                    VALUES
                    (
                    ?,
                    ?,
                    NOW(),
                    NOW(),
                    1)`;

            connection.query(query,
            [ parObjTBIMAGENSCAROUSEL.NOMEIMAGEM,
              decodeURIComponent(escape(atob(parObjTBIMAGENSCAROUSEL.SCRIMAGEM ?? ""))) ?? ""]
          , (error, results) => {   
          
              if (error) {
                res.status(500).json({ error: 'Erro ao Salvar Informações ', error});
                return;
              }
          
              if (results){    
                const insertedId = results.insertId;  
                res.json({ ID: insertedId, });
                return;
              } 
          
        });

      }else
      {
        query = `UPDATE TBIMAGENSCAROUSEL
                    SET
                    NOMEIMAGEM = ?,
                    SCRIMAGEM = ?,
                    DTALTERACAO = NOW()
                    WHERE IDIMAGEM = ?`;
    
    
              connection.query(query,
                [parObjTBIMAGENSCAROUSEL.NOMEIMAGEM,                 
                 decodeURIComponent(escape(atob(parObjTBIMAGENSCAROUSEL.SCRIMAGEM ?? ""))) ?? "",
                 parObjTBIMAGENSCAROUSEL.IDIMAGEM]
                , (error, results) => {

                  if (error) {
                    res.status(500).json({ error: 'Erro ao Salvar Informações ', error});
                    return;
                  }
              
                  if (results.changedRows > 0) {    
                    const insertedId = results.changedRows;  
                    res.json({ ID: insertedId, });
                    return;
                  }           
              });
      }
    }catch (erro)
    {
        console.log("Erro: "+ erro);
        throw erro;
    }finally{
      FecharConexao()
    }
  });

  app.post('/DeletarImagemCarousel', (req, res) => {

    try {
      AbrirConexao();

      let { parID } = req.body;

      if (!parID) {
        return res.status(400).json({ error: 'parID is required' });
      }
      
      var query = ``;
        query = `UPDATE TBIMAGENSCAROUSEL
                    SET
                    IDSTATUSIMAGEM = ?
                    WHERE IDIMAGEM = ?`;
    
    
              connection.query(query,
                 [ 18, //Código da Situação Deletado!
                  parID
                 ]
                , (error, results) => {

                  if (error) {
                    res.status(500).json({ error: 'Erro ao Salvar Informações ', error});
                    return;
                  }
              
                  if (results.changedRows > 0) {    
                    const insertedId = results.changedRows;  
                    res.json({ ID: insertedId, });
                    return;
                  }           
              });
      
    }catch (erro)
    {
        console.log("Erro: "+ erro);
        throw erro;
    }finally{
      FecharConexao()
    }
  });











  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });