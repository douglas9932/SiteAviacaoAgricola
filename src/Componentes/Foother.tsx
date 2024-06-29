import "./Foother.css";
import { Link } from "react-router-dom";
import imageLogo from '../Imagens/LogoStoll.png';
import imageEmail from '../Imagens/Contatos/Email.svg';
import imageWhats from '../Imagens/Contatos/Whatsapp.svg';
import imageTelefone from '../Imagens/Contatos/Telefone.svg';


const Foother = () => {
    
    const scrollToSection = (sectionId: string) => {
        const navbarElement = document.querySelector('nav') as HTMLElement;
        const focarElement = document.getElementById(sectionId);
        if (focarElement) {
          if (navbarElement) {
            const navbarHeight = navbarElement.offsetHeight;
            window.scrollTo({
              top: (focarElement.offsetTop - navbarHeight - 25),
              behavior: 'smooth',
            });
          }
        }
      };

      return (
        <footer className="footer">
          <div className="logo-container">
          <Link to="/" className="title">
            <img src={imageLogo} alt="Description" className= "logo"  onClick={() => scrollToSection('SessaoHome')}/>
          </Link>
          </div>
          <div className="footer-content">
            <div className="contacts">
              <h2>Contatos</h2>
                <div className="Sede">
                    <label>Palotina</label>
                    <div className="Infos">
                        <div>
                            <img src={imageEmail} alt="Email"></img>
                            <label>contato@exemplo.com</label>
                        </div>
                        <div>
                            <img src={imageWhats} alt="Whatsapp"></img>
                            <label>(11) 1234-5678</label>
                        </div>
                        <div>
                            <img src={imageTelefone} alt="Telefone"></img>
                            <label>(11) 3649-5678</label>
                        </div>
                    </div>
                    <div className="cssEndereco">
                        <label>Endereço: Rua Exemplo, 123</label>
                    </div>
                </div>

                <div className="Sede">
                    <label>Assis</label>
                    <div className="Infos">
                        <div>
                            <img src={imageEmail}></img>
                            <label>contato@exemplo.com</label>
                        </div>
                        <div>
                            <img src={imageWhats}></img>
                            <label>(11) 1234-5678</label>
                        </div>
                    </div>
                    <div className="cssEndereco">
                        <label>Endereço: Rua Exemplo, 123</label>
                    </div>
                </div>
            </div>

            <div className="navigation">
                <h2>Navegação</h2>
                <div className="BotoesNavegacao">
                    <button onClick={() => scrollToSection('SessaoHome')}>Home</button>
                    <button onClick={() => scrollToSection('SessaoSobre')}>Sobre</button>
                    <button onClick={() => scrollToSection('SessaoProdutos')}>Produtos</button>
                    <button onClick={() => scrollToSection('SessaoNoticias')}>Noticias</button>
                    <button onClick={() => scrollToSection('SessaoTabelaCalibracao')}>Tabela De Calibracao</button>
                    <button onClick={() => scrollToSection('SessaoTestesStol')}>Testes Stol</button>
                    <button onClick={() => scrollToSection('SessaoContato')}>Contato</button>
                </div>
            </div> 
          </div>
        </footer>
      );
};

export default Foother;
