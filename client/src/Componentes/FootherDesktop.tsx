import styles from "./FootherDesktop.module.css";
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
        <footer className={styles.footer}>
          <div className={styles.logocontainer}>
          <Link to="/" className={styles.title}>
            <img src={imageLogo} alt="Description" className= "logo"  onClick={() => scrollToSection('SessaoHome')}/>
          </Link>
          </div>
          <div className={styles.footercontent}>
            <div className={styles.contacts}>
              <h2>Contatos</h2>
                <div className={styles.Sede}>
                    <label>Palotina</label>
                    <div className={styles.Infos}>
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
                    <div className={styles.cssEndereco}>
                        <label>Endereço: Rua Exemplo, 123</label>
                    </div>
                </div>

                <div className={styles.Sede}>
                    <label>Toledo</label>
                    <div className={styles.Infos}>
                        <div>
                            <img src={imageEmail} alt="Email"></img>
                            <label>contato@exemplo.com</label>
                        </div>
                        <div>
                            <img src={imageWhats} alt="Whats"></img>
                            <label>(11) 1234-5678</label>
                        </div>
                    </div>
                    <div className={styles.cssEndereco}>
                        <label>Endereço: Rua Exemplo, 123</label>
                    </div>
                </div>

            </div>

            <div className={styles.navigation}>
                <h2>Navegação</h2>
                <div className={styles.BotoesNavegacao}>
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
