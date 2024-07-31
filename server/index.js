const { format, parseISO } = require('date-fns');
const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const port = 32322;


  // app.use(express.json());
  app.use(cors());
  app.use(express.json({ limit: '200mb' })); // Aumente o limite conforme necessário
  app.use(express.urlencoded({ limit: '200mb', extended: true })); // Para dados de formulários

  let connection;
  let activeOperations = 0;

  const AbrirConexao = ()=>{

    if(!connection || connection?._closing)
    {
      connection = mysql.createConnection({
        // host: 'localhost',
        // user: 'root',
        // password: 'TescaroSoft',
        // database: 'db_stoll',
        
        // host: 'localhost',
        // user: 'srv5_root',
        // password: 'Stoll12345',
        // database: 'srv5_DB_STOLL',
        
        host: '193.203.175.85',
        user: 'u156150556_root',
        password: 'Root_Stoll12345',
        database: 'u156150556_DB_STOLL',
    
        // keepAliveInitialDelay: 10000, // 0 by default.
        // enableKeepAlive: true, // false by default
        // waitForConnections: true,
    
        // connectionLimit: 50,
        // queueLimit: 0  
        // connectTimeout: 10000
      });

      connection.connect((err) => {
        if (err) {
          console.error('Erro ao conectar ao banco de dados:', err.stack);
          return;
        }
        console.log('Conectado ao banco de dados.');
        
        return;
      });

    }


  }
  
  const FecharConexao= () =>{
    
    if (activeOperations === 0) {
      if (connection && connection.state !== 'disconnected') {
        connection.end(err => {
          if (err) {
            console.error('Error closing the connection:', err);
          } else {
            console.log('Connection closed');
          }
        });
      }
    } else {
      console.log('There are active operations, connection will not be closed now.');
    }
  }

  function executarConsulta(query, params, callback) {
    try {
      if (!connection || connection.state === 'disconnected' || connection._closing) {
        AbrirConexao();
      }
    
      activeOperations++; // Incrementar o contador de operações ativas
    
      connection.query(query, params, (err, results) => {
        activeOperations--; // Decrementar o contador de operações ativas
    
        if (err) {
          return callback(err);
        }
        callback(null, results);
    
        // Fechar a conexão se não houver mais operações ativas
        if (activeOperations === 0) {
          FecharConexao();
        }
      })
      if (activeOperations === 0) {
        FecharConexao();
      };
    }catch{
      FecharConexao();
    }    
  }


  app.get('/TestarConexaoComBanco', (req, res) => {
    try{

      executarConsulta('SELECT 1 + 1 AS TESTE', (error, results) => {
      
        if (error) {
          res.status(500).json({ error: 'Erro ao buscar usuários', mensagem: error});
          return;
        }

        if (results.length > 0) 
        { 
          res.json({ data: true });
        } else {
          res.json({ data: false });
        }
      });

    }catch (erro)
    {
        console.log("Erro: "+ erro);
        throw erro;
    }finally{
    }
  });

  app.post('/ValidarLogin', (req, res) => {
    try {
      
      const { parLogin, parSenha } = req.body;
      
      const query = 'SELECT * FROM TBUSUARIOS WHERE NMLOGIN = ? AND SENHA = ?';
      
        executarConsulta(query, [parLogin, parSenha], (error, results) => {
        
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
    }
  });

/*----------------------------------INICIO Informações da Empresa----------------------------------*/
  app.get('/GetInfoEmpresa', (req, res) => {
    try {
      const query = 'SELECT * FROM TBEMPRESA';
      
      executarConsulta(query, (error, results) => {
      
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
    }
  });

  app.post('/SalvarInfoEmpresas', (req, res) => {

    try {
      
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
            DESCRICAOSOBRENOS,
            HISTORICOSOBRENOS,
            OBJETIVOSOBRENOS,
            IMAGEMSOBRENOS,
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
              ?,
              ?,
              ?,
              ?,
              NOW(),
              NOW(),
              1)`;
              
              executarConsulta(query,
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
                  decodeURIComponent(escape(atob(parObjTBEMPRESA.ICONE ?? ""))) ?? "",
                  parObjTBEMPRESA.DESCRICAOSOBRENOS,
                  parObjTBEMPRESA.HISTORICOSOBRENOS,
                  parObjTBEMPRESA.OBJETIVOSOBRENOS,
                  decodeURIComponent(escape(atob(parObjTBEMPRESA.IMAGEMSOBRENOS ?? ""))) ?? "",
                ]
          , (error, results) => {   
          
              if (error) {
                res.status(500).json({ error: 'Erro ao Salvar Informações ', error});
                return;
              }
          
              if (results.length > 0) {    
                const insertedId = results.insertId;  
                res.json({ ID: insertedId, });
                return;
              } else if(results.affectedRows > 0){
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
                    DESCRICAOSOBRENOS = ?,
                    HISTORICOSOBRENOS = ?,
                    OBJETIVOSOBRENOS = ?,
                    IMAGEMSOBRENOS = ?,
                    DTALTERACAO = NOW()
                    WHERE IDEMPRESA = ?`;
    
              executarConsulta(query,
                [ parObjTBEMPRESA.NOMEFANTASIA,
                  parObjTBEMPRESA.RAZAOSOCIAL,
                  parObjTBEMPRESA.CNPJ.replace(/[^a-zA-Z0-9]/g, ''),
                  parObjTBEMPRESA.INSCRICAOESTADUAL.replace(/[^a-zA-Z0-9]/g, ''),
                  parObjTBEMPRESA.ENDERECO,
                  parObjTBEMPRESA.TELEFONE.replace(/[^a-zA-Z0-9]/g, ''),
                  parObjTBEMPRESA.CELULAR.replace(/[^a-zA-Z0-9]/g, ''),
                  (format(parseISO(parObjTBEMPRESA.DATAABERTURA), 'yyyy-MM-dd')),
                  parObjTBEMPRESA.SEGMENTO,
                  parObjTBEMPRESA.RESPONSAVEL,
                  parObjTBEMPRESA.CPFRESPONSAVEL.replace(/[^a-zA-Z0-9]/g, ''),
                  parObjTBEMPRESA.EXTENSAO_LOGO_236X67,
                  (decodeURIComponent(escape(atob(parObjTBEMPRESA.LOGO_236X67 ?? ""))) ?? ""),
                  parObjTBEMPRESA.EXTENSAO_ICONE,
                  (decodeURIComponent(escape(atob(parObjTBEMPRESA.ICONE ?? ""))) ?? ""),    
                  parObjTBEMPRESA.DESCRICAOSOBRENOS,
                  parObjTBEMPRESA.HISTORICOSOBRENOS,
                  parObjTBEMPRESA.OBJETIVOSOBRENOS,
                  (decodeURIComponent(escape(atob(parObjTBEMPRESA.IMAGEMSOBRENOS ?? ""))) ?? ""),             
                  parObjTBEMPRESA.IDEMPRESA
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
      }
    }catch (erro)
    {
        console.log("Erro: "+ erro);
        throw erro;
    }finally{
    }
  });
/*-------------------------------------FIM Informações da Empresa------------------------------------*/
  


/*--------------------------------------INICIO Imagens carousel--------------------------------------*/
  app.get('/GetImagensCarousel', (req, res) => {
    try {
      const query = 'SELECT * FROM TBIMAGENSCAROUSEL WHERE IDSTATUSIMAGEM <> 18'; //18 Situação Deletado!
      
      executarConsulta(query, (error, results) => {
      
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
    }
  });

  app.post('/ValidarSeNomeImagemCarouselExist', (req, res) => {
    try {
      
      const { parNomeImagem, parIDIMAGEM } = req.body;
      
      const query = 'SELECT COUNT(NOMEIMAGEM) AS Existe FROM TBIMAGENSCAROUSEL WHERE NOMEIMAGEM = ? AND IDIMAGEM <> ? AND IDSTATUSIMAGEM <> 18 '; //18 Situação Deletado!
      
      executarConsulta(query, [parNomeImagem, parIDIMAGEM], (error, results) => {
      
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
    }
  });

  app.post('/SalvarImagemCarousel', (req, res) => {

    try {
      
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
              
              executarConsulta(query,
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
    
              executarConsulta(query,
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
    }
  });

  app.post('/DeletarImagemCarousel', (req, res) => {

    try {
      
      let { parID } = req.body;
      
      if (!parID) {
        return res.status(400).json({ error: 'parID is required' });
      }
      
      var query = ``;
      query = `UPDATE TBIMAGENSCAROUSEL
      SET
      IDSTATUSIMAGEM = ?
      WHERE IDIMAGEM = ?`;
      
      
      executarConsulta(query,
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
    }
  });
/*--------------------------------------FIM Imagens carousel--------------------------------------*/



/*--------------------------------------INICIO Contatos--------------------------------------*/
  app.get('/GetContatos', (req, res) => {
    try {
      const query = 'SELECT * FROM TBCONTATOS WHERE IDSTATUSCONTATO <> 18'; //18 Situação Deletado!
      
      executarConsulta(query, (error, results) => {
      
      if (error) {
        res.status(500).json({ error: 'Erro ao Buscar Contatos '});
        return;
      }
  
      if (results.length > 0) 
      { 
        results.forEach(contato => {
          contato.TELEFONE = formatTelefone(contato.TELEFONE);
          contato.CELULAR = formatCelular(contato.CELULAR);
        });
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
    }
  });

  app.post('/SalvarContato', (req, res) => {

    try {
      
      let { parObjTBCONTATOS } = req.body;
      
      if (!parObjTBCONTATOS) {
        return res.status(400).json({ error: 'parObjTBCONTATOS is required' });
      }
      else{
        parObjTBCONTATOS = JSON.parse(decodeURIComponent(escape(atob(parObjTBCONTATOS))));
      }
      
      var query = ``;
      
      if(parObjTBCONTATOS.IDCONTATO == undefined || parObjTBCONTATOS.IDCONTATO == 0)
        {
          query = `INSERT INTO TBCONTATOS
                  (NMCIDADECONTATO,
                  EMAILCONTATO,
                  ENDERECO,
                  TELEFONE,
                  CELULAR,
                  DTCADASTRO,
                  DTALTERACAO,
                  IDSTATUSCONTATO)
                  VALUES
                  (?,
                  ?,
                  ?,
                  ?,
                  ?,
                  NOW(),
                  NOW(),
                  1)`;
              
          executarConsulta(query,
          [ parObjTBCONTATOS.NMCIDADECONTATO,
            parObjTBCONTATOS.EMAILCONTATO,
            parObjTBCONTATOS.ENDERECO,
            parObjTBCONTATOS.TELEFONE.replace(/[^a-zA-Z0-9]/g, ''),
            parObjTBCONTATOS.CELULAR.replace(/[^a-zA-Z0-9]/g, ''),
            ]
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
        query = `UPDATE TBCONTATOS
                SET
                NMCIDADECONTATO = ?,
                EMAILCONTATO = ?,
                ENDERECO = ?,
                TELEFONE = ?,
                CELULAR = ?,
                DTALTERACAO = NOW()
                WHERE IDCONTATO = ?`;
    
              executarConsulta(query,
                [parObjTBCONTATOS.NMCIDADECONTATO,
                 parObjTBCONTATOS.EMAILCONTATO,
                 parObjTBCONTATOS.ENDERECO,
                 parObjTBCONTATOS.TELEFONE.replace(/[^a-zA-Z0-9]/g, ''),
                 parObjTBCONTATOS.CELULAR.replace(/[^a-zA-Z0-9]/g, ''),
                 parObjTBCONTATOS.IDCONTATO]
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
    }
  });

  app.post('/DeletarContato', (req, res) => {

    try {
      
      let { parID } = req.body;
      
      if (!parID) {
        return res.status(400).json({ error: 'parID is required' });
      }
      
      var query = ``;
      query = `UPDATE TBCONTATOS
      SET
      IDSTATUSCONTATO = ?
      WHERE IDCONTATO = ?`;
      
      
      executarConsulta(query,
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
    }
  });
/*--------------------------------------FIM Contatos--------------------------------------*/


/*--------------------------------------INICIO Produtos--------------------------------------*/
  app.get('/GetProdutos', (req, res) => {
    try {
      const query = 'SELECT * FROM TBPRODUTOS WHERE IDSTATUSPRODUTO <> 18'; //18 Situação Deletado!
      
      executarConsulta(query, (error, results) => {
      
      if (error) {
        res.status(500).json({ error: 'Erro ao Buscar Produtos '});
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
    }
  });

  app.post('/GetProdutoByID', (req, res) => {
    try {

      let { parID } = req.body;
      const query = 'SELECT * FROM TBPRODUTOS WHERE IDPRODUTO = ? LIMIT 1 '; //18 Situação Deletado!
      
      executarConsulta(query, [parID], (error, results) => {
      
      if (error) {
        res.status(500).json({ error: 'Erro ao Buscar Produtos '});
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
    }
  });

  app.post('/SalvarProduto', (req, res) => {

    try {
      
      let { parObjTBPRODUTOS } = req.body;
      
      if (!parObjTBPRODUTOS) {
        return res.status(400).json({ error: 'parObjTBPRODUTOS is required' });
      }
      else{
        parObjTBPRODUTOS = JSON.parse(decodeURIComponent(escape(atob(parObjTBPRODUTOS))));
      }
      
      var query = ``;
      
      if(parObjTBPRODUTOS.IDPRODUTO == undefined || parObjTBPRODUTOS.IDPRODUTO == 0)
        {
          query = `INSERT INTO TBPRODUTOS
                    (
                    NOMEPRODUTO,
                    DESCRICAOPRODUTO,
                    IMAGEMCAPA,
                    IMAGEMPRODUTOEXPANDIDO,
                    DTCADASTRO,
                    DTALTERACAO,
                    IDSTATUSPRODUTO)
                    VALUES
                    (
                    ?,
                    ?,
                    ?,
                    ?,
                    NOW(),
                    NOW(),
                    1)`;
              
          executarConsulta(query,
          [ parObjTBPRODUTOS.NOMEPRODUTO,
            parObjTBPRODUTOS.DESCRICAOPRODUTO,
            decodeURIComponent(escape(atob(parObjTBPRODUTOS.IMAGEMCAPA ?? ""))) ?? "",
            decodeURIComponent(escape(atob(parObjTBPRODUTOS.IMAGEMPRODUTOEXPANDIDO ?? ""))) ?? "",
            ]
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
        query = `UPDATE TBPRODUTOS
                SET
                NOMEPRODUTO = ?,
                DESCRICAOPRODUTO = ?,
                IMAGEMCAPA = ?,
                IMAGEMPRODUTOEXPANDIDO = ?,
                DTALTERACAO = NOW()
                WHERE IDPRODUTO = ?`;
    
              executarConsulta(query,
                [parObjTBPRODUTOS.NOMEPRODUTO,
                parObjTBPRODUTOS.DESCRICAOPRODUTO,
                decodeURIComponent(escape(atob(parObjTBPRODUTOS.IMAGEMCAPA ?? ""))) ?? "",
                decodeURIComponent(escape(atob(parObjTBPRODUTOS.IMAGEMPRODUTOEXPANDIDO ?? ""))) ?? "",
                parObjTBPRODUTOS.IDPRODUTO]
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
    }
  });

  app.post('/DeletarProduto', (req, res) => {

    try {
      
      let { parID } = req.body;
      
      if (!parID) {
        return res.status(400).json({ error: 'parID is required' });
      }
      
      var query = ``;

      query = `UPDATE TBPRODUTOS
                SET
                IDSTATUSPRODUTO = ?
                WHERE IDPRODUTO = ? `;
      
      
      executarConsulta(query,
          [ 18, //Código da Situação Deletado!
          parID
          ] , (error, results) => {

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
    }
  });
/*--------------------------------------FIM Produtos--------------------------------------*/

/*--------------------------------------INICIO Partes Produtos--------------------------------------*/
  app.post('/GetPartesProduto', (req, res) => {
    try {

      let { parIDPRODUTO } = req.body;

      const query = 'SELECT * FROM TBPARTESPRODUTOS WHERE IDPRODUTO = ? AND IDSTATUSPARTE <> 18 ORDER BY NUMEROPARTE ASC'; //18 Situação Deletado!
      
      executarConsulta(query, [parIDPRODUTO], (error, results) => {
      
      if (error) {
        res.status(500).json({ error: 'Erro ao Buscar Produtos '});
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
    }
  });

  app.post('/SalvarPartesProduto', (req, res) => {

    try {
      
      let { parObjTBPARTESPRODUTOS } = req.body;
      
      if (!parObjTBPARTESPRODUTOS) {
        return res.status(400).json({ error: 'parObjTBPARTESPRODUTOS is required' });
      }
      else{
        parObjTBPARTESPRODUTOS = JSON.parse(decodeURIComponent(escape(atob(parObjTBPARTESPRODUTOS))));
      }
      
      var query = ``;
      
      if(parObjTBPARTESPRODUTOS.IDPARTE == undefined || parObjTBPARTESPRODUTOS.IDPARTE == 0)
        {
          query = `INSERT INTO TBPARTESPRODUTOS
                    (NUMEROPARTE,
                    DESCRICAOPARTE,
                    IDPRODUTO,
                    DTCADASTRO,
                    DTALTERACAO,
                    IDSTATUSPARTE)
                    VALUES
                    (
                    ?,
                    ?,
                    ?,
                    NOW(),
                    NOW(),
                    1)`;
              
          executarConsulta(query,
            [ parObjTBPARTESPRODUTOS.NUMEROPARTE,
              parObjTBPARTESPRODUTOS.DESCRICAOPARTE,
              parObjTBPARTESPRODUTOS.IDPRODUTO,
            ]
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
        query = `UPDATE TBPARTESPRODUTOS
                  SET
                  NUMEROPARTE = ?,
                  DESCRICAOPARTE = ?,
                  DTALTERACAO = NOW()
                  WHERE IDPARTE = ?`;
    
              executarConsulta(query,
                [parObjTBPARTESPRODUTOS.NUMEROPARTE,
                  parObjTBPARTESPRODUTOS.DESCRICAOPARTE,
                parObjTBPARTESPRODUTOS.IDPARTE]
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
    }
  });

  app.post('/DeletarParteProduto', (req, res) => {

    try {
      
      let { parID } = req.body;
      
      if (!parID) {
        return res.status(400).json({ error: 'parID is required' });
      }
      
      var query = ``;

      query = `UPDATE TBPARTESPRODUTOS
                SET
                IDSTATUSPARTE = ?
                WHERE IDPARTE = ? `;
      
      
      executarConsulta(query,
          [ 18, //Código da Situação Deletado!
          parID
          ] , (error, results) => {

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
    }
  });
/*--------------------------------------FIM Partes Produtos--------------------------------------*/


/*--------------------------------------INICIO Noticias--------------------------------------*/
  app.get('/GetNoticias', (req, res) => {
    try {
      const query = 'SELECT * FROM TBNOTICIAS WHERE IDSTATUSNOTICIA <> 18'; //18 Situação Deletado!
      
      executarConsulta(query, (error, results) => {
      
      if (error) {
        res.status(500).json({ error: 'Erro ao Buscar Noticias '});
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
    }
  });

  app.post('/GetNoticiasByID', (req, res) => {
    try {

      let { parID } = req.body;
      const query = 'SELECT * FROM TBNOTICIAS WHERE IDNOTICIA = ? LIMIT 1 '; //18 Situação Deletado!
      
      executarConsulta(query, [parID], (error, results) => {
      
      if (error) {
        res.status(500).json({ error: 'Erro ao Buscar Noticias '});
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
    }
  });

  app.post('/SalvarNoticia', (req, res) => {

    try {
      
      let { parObjTBNOTICIAS } = req.body; 
      
      if (!parObjTBNOTICIAS) {
        return res.status(400).json({ error: 'parObjTBNOTICIAS is required' });
      }
      else{
        parObjTBNOTICIAS = JSON.parse(decodeURIComponent(escape(atob(parObjTBNOTICIAS))));
      }
      
      var query = ``;
      
      if(parObjTBNOTICIAS.IDNOTICIA == undefined || parObjTBNOTICIAS.IDNOTICIA == 0)
        {
          query = `INSERT INTO TBNOTICIAS
                    (
                    TITULONOTICIA,
                    DESCRICAONOTICIA,
                    IMAGEMCAPA,
                    DTCADASTRO,
                    DTALTERACAO,
                    IDSTATUSNOTICIA
                    )
                    VALUES(
                    ?,
                    ?,
                    ?,
                    NOW(),
                    NOW(),
                    1)`;
              
          executarConsulta(query,
          [ parObjTBNOTICIAS.TITULONOTICIA,
            parObjTBNOTICIAS.DESCRICAONOTICIA,
            decodeURIComponent(escape(atob(parObjTBNOTICIAS.IMAGEMCAPA ?? ""))) ?? ""
            ]
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
        query = `UPDATE TBNOTICIAS
                SET
                TITULONOTICIA = ?,
                DESCRICAONOTICIA = ?,
                IMAGEMCAPA = ?,
                DTALTERACAO = NOW()
                WHERE IDNOTICIA = ?`;
    
              executarConsulta(query,
                [parObjTBNOTICIAS.TITULONOTICIA,
                parObjTBNOTICIAS.DESCRICAONOTICIA,
                decodeURIComponent(escape(atob(parObjTBNOTICIAS.IMAGEMCAPA ?? ""))) ?? "",
                parObjTBNOTICIAS.IDNOTICIA]
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
    }
  });

  app.post('/DeletarNoticia', (req, res) => {

    try {
      
      let { parID } = req.body;
      
      if (!parID) {
        return res.status(400).json({ error: 'parID is required' });
      }
      
      var query = ``;

      query = `UPDATE TBNOTICIAS
                SET
                IDSTATUSNOTICIA = ?
                WHERE IDNOTICIA = ? `;
      
      
      executarConsulta(query,
          [ 18, //Código da Situação Deletado!
          parID
          ] , (error, results) => {

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
    }
  });
/*--------------------------------------FIM Partes Noticias--------------------------------------*/


/*--------------------------------------INICIO Testes--------------------------------------*/
app.get('/GetTestes', (req, res) => {
  try {
    const query = 'SELECT * FROM TBTESTES WHERE IDSTATUSTESTE <> 18'; //18 Situação Deletado!
    
    executarConsulta(query, (error, results) => {
    
    if (error) {
      res.status(500).json({ error: 'Erro ao Buscar Testes '});
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
  }
});

app.post('/GetTesteByID', (req, res) => {
  try {

    let { parID } = req.body;
    const query = 'SELECT * FROM TBNOTICIAS WHERE IDNOTICIA = ? LIMIT 1 '; //18 Situação Deletado!
    
    executarConsulta(query, [parID], (error, results) => {
    
    if (error) {
      res.status(500).json({ error: 'Erro ao Buscar Noticias '});
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
  }
});

app.post('/SalvarTeste', (req, res) => {

  try {
    
    let { parObjTBTESTES } = req.body; 
    
    if (!parObjTBTESTES) {
      return res.status(400).json({ error: 'parObjTBTESTES is required' });
    }
    else{
      parObjTBTESTES = JSON.parse(decodeURIComponent(escape(atob(parObjTBTESTES))));
    }
    
    var query = ``;
    
    if(parObjTBTESTES.IDTESTE == undefined || parObjTBTESTES.IDTESTE == 0)
      {
        query = `INSERT INTO TBTESTES
                  (
                  NOMETESTE,
                  DOCUMENTOTESTE,
                  EXTENSAODOCUMENTO,
                  DTCADASTRO,
                  DTALTERACAO,
                  IDSTATUSTESTE
                  )
                  VALUES(
                  ?,
                  ?,
                  ?,
                  NOW(),
                  NOW(),
                  1)`;
            
          executarConsulta(query,
          [ parObjTBTESTES.NOMETESTE,
          parObjTBTESTES.DOCUMENTOTESTE,
          parObjTBTESTES.EXTENSAODOCUMENTO
          ]
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
      query = `UPDATE TBTESTES
              SET
              NOMETESTE = ?,
              DOCUMENTOTESTE = ?,
              EXTENSAODOCUMENTO = ?,
              DTALTERACAO = NOW()
              WHERE IDTESTE = ?`;
  
            executarConsulta(query,
              [parObjTBTESTES.NOMETESTE,
              parObjTBTESTES.DOCUMENTOTESTE,
              parObjTBTESTES.EXTENSAODOCUMENTO,
              parObjTBTESTES.IDTESTE]
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
  }
});

app.post('/DeletarTeste', (req, res) => {

  try {
    
    let { parID } = req.body;
    
    if (!parID) {
      return res.status(400).json({ error: 'parID is required' });
    }
    
    var query = ``;

    query = `UPDATE TBTESTES
              SET
              IDSTATUSTESTE = ?
              WHERE IDTESTE = ? `;
    
    
    executarConsulta(query,
        [ 18, //Código da Situação Deletado!
        parID
        ] , (error, results) => {

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
  }
});
/*--------------------------------------FIM Partes Testes--------------------------------------*/















  const formatTelefone = (telefone) => {
    
    let onlyNums;
    try{
      onlyNums= telefone.replace(/\D/g, '');
    }catch{
      onlyNums = telefone;
    }
        // Implementa uma lógica de formatação genérica
        if (onlyNums.length <= 12) {
          return onlyNums.replace(
            /^(\d{2})(\d{4})(\d{4})$/,
            '($1) $2-$3'
          );
        }
        return telefone;
  };

  const formatCelular = (value) => {
    let onlyNums;
    try{
      onlyNums= value.replace(/\D/g, '');
    }catch{
      onlyNums = value;
    }
    // Implementa uma lógica de formatação genérica
    if (onlyNums.length <= 12) {
      return onlyNums.replace(
        /^(\d{2})(\d{1})(\d{4})(\d{4})$/,
        '($1) $2 $3-$4'
      );
    }
    return value;
  };

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
