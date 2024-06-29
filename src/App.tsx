import './App.css';
import Focar from './Componentes/Focar';
import Foother from './Componentes/Foother';
import { Navbar } from './Componentes/Navbar';
import { Home } from './Formularios/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Body">
        <div style={{ height: '70vh', background: '#f0f0f0' }}>
          <Home/>
        </div>
        <div className='SeparadorDeSessoes'></div>

        <div  style={{ height: '50vh', background: '#f0f0f0' }}>
          <Focar id="SessaoSobre"/>
          <h1>Sobre</h1>
        </div>
        <div className='SeparadorDeSessoes'></div>

        <div  style={{ height: '100vh', background: '#f0f0f0' }}>
          <Focar id="SessaoProdutos"/>
          <h1>Produtos</h1>
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

        <div style={{ height: '30vh', background: '#f0f0f0' }}>
          <Focar id="Foother"/>
          <Foother></Foother>
        </div>
      </div>
    </div>
  );
}

export default App;
