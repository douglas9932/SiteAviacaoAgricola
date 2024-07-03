import './App.css';
import Focar from './Componentes/Focar';
import FootherDesktop from './Componentes/FootherDesktop';
import { Navbar } from './Componentes/Navbar';
import { Home } from './Formularios/Home';
import { Produtos } from './Formularios/Produtos';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Body">
         <div>
          <Home/>
        </div>
        <div className='SeparadorDeSessoes'></div> 

         <div  style={{ height: '50vh', background: '#f0f0f0' }}>
          <Focar id="SessaoSobre"/>
          <h1>Sobre</h1>
        </div>
        <div className='SeparadorDeSessoes'></div>

        <div>
          <Produtos/>
        </div>
        <div className='SeparadorDeSessoes'></div>

        <div style={{ height: '100vh', background: '#f0f0f0' }}>
          <Focar id="SessaoNoticias"/>
          <h1>Noticias</h1>
        </div>
        <div className='SeparadorDeSessoes'></div>

        <div style={{ height: '100vh', background: '#f0f0f0' }}>
          <Focar id="SessaoTabelaCalibracao"/>
          <h1>Tabela de Calibração</h1>
        </div>
        <div className='SeparadorDeSessoes'></div>

        <div style={{ height: '100vh', background: '#f0f0f0' }}>
          <Focar id="SessaoTestesStol"/>
          <h1>Testes Stol</h1>
        </div>
        <div className='SeparadorDeSessoes'></div>


        <div style={{ height: '100vh', background: '#f0f0f0' }}>
          <Focar id="SessaoContato"/>
          <h1>Contato</h1>
        </div>
        <div className='SeparadorDeSessoes'></div> 

        <div className='FootherDesktop' style={{ height: '30vh', background: '#f0f0f0' }}>
          <Focar id="Foother"/>
          <FootherDesktop></FootherDesktop>
        </div>
      </div>
    </div>
  );
}

export default App;
