import styles from "./FootherDesktop.module.css";
import { Link, useNavigate } from "react-router-dom";
import imageLogo from '../Imagens/LogoStoll.png';
import imageEmail from '../Imagens/Contatos/Email.svg';
import imageWhats from '../Imagens/Contatos/Whatsapp.svg';
import imageTelefone from '../Imagens/Contatos/Telefone.svg';
import { useEffect, useMemo, useState } from "react";
import { FrmContatosController } from "../Formularios/Controllers/FrmContatosController";
import { TBCONTATOS } from "../Classes/Tabelas/TBCONTATOS";


const Foother = () => {
  const navigate = useNavigate();

  const controller = useMemo(() => new FrmContatosController(), []);
  const [ObjLstContatos, setObjLstContatos ] = useState<TBCONTATOS[] | []>();

  useEffect(() => {
    
    const BuscarDadosContatos = async () => {

      await controller.GetContatos();    
      setObjLstContatos(controller.ObjLstContatos);
    }
    BuscarDadosContatos();

  }, [controller]);
  
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
        }else{      
          localStorage.setItem('focarElement', sectionId)
          navigate("/");      
        }
      };

      const OpenInGoogleMaps = ( address: string ) => {
          const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
          window.open(url, '_blank');
      };

      const OpenEmailClient  = (email: string) => {
        const mailtoLink = `mailto:${email}`;
        window.location.href = mailtoLink;
      };

      const OpenWhatsApp = (phoneNumber: string) => {
        const whatsappUrl = `whatsapp://send?phone=+55 ${phoneNumber}&text=${encodeURIComponent('Escrever Uma Mensagem!')}`;
        window.open(whatsappUrl, '_blank');
      };

      const OpenDialer = ( phoneNumber: string ) => {
          const telUrl = `tel:${phoneNumber}`;
          window.location.href = telUrl;
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
              {ObjLstContatos?.map((contato) => (          
                <div className={styles.Sede}>
                    <label>{contato.NMCIDADECONTATO}</label>
                    <div className={styles.Infos}>
                        <div style={{cursor: 'pointer'}} onClick={()=>OpenEmailClient(contato.EMAILCONTATO)}>
                            <img src={imageEmail} alt="Email"></img>
                            <label style={{cursor: 'pointer'}}>{contato.EMAILCONTATO}</label>
                        </div>
                        <div style={{cursor: 'pointer'}} onClick={()=>OpenWhatsApp(contato.CELULAR)}>
                            <img src={imageWhats} alt="Whatsapp"></img>
                            <label style={{cursor: 'pointer'}}>{contato.CELULAR}</label>
                        </div>
                        <div style={{cursor: 'pointer'}} onClick={()=>OpenDialer(contato.TELEFONE)}>
                            <img src={imageTelefone} alt="Telefone"></img>
                            <label  style={{cursor: 'pointer'}}>{contato.TELEFONE}</label>
                        </div>
                    </div>
                    <div className={styles.cssEndereco}>
                        <label onClick={() => OpenInGoogleMaps(contato.ENDERECO)}>Endereço: {contato.ENDERECO}</label>
                    </div>
                </div>
              ))}
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
