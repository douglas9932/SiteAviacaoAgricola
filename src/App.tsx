import './App.css';
import { Navbar } from './Componentes/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <div id="SessaoHome" style={{ height: '100vh', background: '#f0f0f0' }}>
          <h1>Home</h1>
        </div>
        <div id="SessaoSobre" style={{ height: '100vh', background: '#f0f0f0' }}>
          <h1>Sobre</h1>
        </div>
        <div id="SessaoProdutos" style={{ height: '100vh', background: '#f0f0f0' }}>
          <h1>Produtos</h1>
        </div>
        <div id="SessaoNoticias" style={{ height: '100vh', background: '#f0f0f0' }}>
          <h1>Noticias</h1>
        </div>
        <div id="SessaoTabelaCalibracao" style={{ height: '100vh', background: '#f0f0f0' }}>
          <h1>Tabela de Calibração</h1>
        </div>
        <div id="SessaoTestesStol" style={{ height: '100vh', background: '#f0f0f0' }}>
          <h1>Testes Stol</h1>
        </div>
        <div id="SessaoContato" style={{ height: '100vh', background: '#f0f0f0' }}>
          <h1>Contato</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
