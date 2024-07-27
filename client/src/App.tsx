import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Focar from './Componentes/Focar';
import FootherDesktop from './Componentes/FootherDesktop';
import { Navbar } from './Componentes/Navbar';
import { Home } from './Formularios/Home';
import { SessaoProdutos } from './Formularios/SessaoProdutos';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import LoginController from './Controllers/Servicos/LoginController';
import { Mensagens } from './Classes/Mensagens';
import { SessaoNoticias } from './Formularios/SessaoNoticias';
import { SessaoTestes } from './Formularios/SessaoTestes';
import { SessaoSobreNos } from './Formularios/SessaoSobreNos';


function App() {
  
  useEffect(() => {
        
    const minhaFuncao = async () => {

      if(! await LoginController.VerificarConexao()){
        Swal.fire({
          text: Mensagens.ConexaoOffline(),
          icon: "error",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          } else if (result.isDenied) {
            
          }
        });
      }
    }
      minhaFuncao();

    // Função para limpar o localStorage
    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    // Adicionar o listener para o evento beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Limpar o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  
  const navigate = useNavigate();
  const Evento=()=>{
    navigate("/Administracao/Home")
  }
  return (
    
      <div className={styles.App}>
        <Navbar />
        <div className={styles.Body}>
          <div>
            <Home/>
            <button onClick={Evento}></button>
          </div>
          <div className={styles.SeparadorDeSessoes}></div> 

          <div  style={{ height: '60vh', background: '#f0f0f0' }}>
            <SessaoSobreNos/>
          </div>
          <div className={styles.SeparadorDeSessoes}></div>

          <div>
            <SessaoProdutos/>
          </div>
          <div className={styles.SeparadorDeSessoes}></div>

          <div style={{ height: '100vh', background: '#f0f0f0' }}>
            <SessaoNoticias/>
          </div>
          <div className={styles.SeparadorDeSessoes}></div>

          <div style={{ height: '100vh', background: '#f0f0f0' }}>
            <Focar id="SessaoTabelaCalibracao"/>
            <h1>Tabela de Calibração</h1>
          </div>
          <div className={styles.SeparadorDeSessoes}></div>

          <div style={{ height: '100vh', background: '#f0f0f0' }}>
            <SessaoTestes/>
          </div>
          <div className={styles.SeparadorDeSessoes}></div>


          <div style={{ height: '100vh', background: '#f0f0f0' }}>
            <Focar id="SessaoContato"/>
            <h1>Contato</h1>
          </div>
          <div className={styles.SeparadorDeSessoes}></div> 

          <div className={styles.FootherDesktop} style={{ height: '30vh', background: '#f0f0f0' }}>
            <Focar id="Foother"/>
            <FootherDesktop></FootherDesktop>
          </div>
        </div>
      </div>
  );
}

export default App;
