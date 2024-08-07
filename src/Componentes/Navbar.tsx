import  { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import {Link, useNavigate} from "react-router-dom";
import imageLogo from '../Imagens/LogoStoll.png';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('SessaoHome'); // Estado para acompanhar a seção ativa


  //Função para atualizar a seção ativa ao rolar a página
  const updateActiveSection = () => {
    const sections = [
      document.getElementById('SessaoHome'),
      document.getElementById('SessaoSobre'),
      document.getElementById('SessaoProdutos'),
      document.getElementById('SessaoNoticias'),
      document.getElementById('SessaoTabelaCalibracao'),
      document.getElementById('SessaoTestesStol'),
      document.getElementById('SessaoContato'),
    ];
    
    const doc = document.querySelector('nav');
    if(doc != null)
    {
      const navbarHeight = doc.offsetHeight;
      const scrollPosition = window.scrollY + navbarHeight + 200;
  
      let active = 'SessaoHome';
      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop) {
          active = section.id;
        }
      }
      setActiveSection(active);      
    }
  };
  
  useEffect(() => {

    if(localStorage.getItem('focarElement')){
      let id = localStorage.getItem('focarElement');
      localStorage.removeItem('focarElement');
      scrollToSection(id ?? '');
    }

    window.addEventListener('scroll', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);      
    };
    
  }, []);


  const scrollToSection = (sectionId: string) => {

    setMenuOpen(false);

    const navbarElement = document.querySelector('nav') as HTMLElement;
    const focarElement = document.getElementById(sectionId);
    if (focarElement) {
      if (navbarElement) {
        const navbarHeight = navbarElement.offsetHeight;
        window.scrollTo({
          top: (focarElement.offsetTop - navbarHeight - 5),
          behavior: 'smooth',
        });
      }
    }else{      
      localStorage.setItem('focarElement', sectionId)
      navigate("/");      
    }
  };
  
  return (
    <nav>
       <div className={styles.container}>
        <div className={styles.DivLogo}>
          <Link to="/" className={styles.title}>
            <img src={imageLogo} alt="Description" className= {styles.responsiveimage}  onClick={() => scrollToSection('SessaoHome')}/>
          </Link>
        </div>
        <div className={styles.menu} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? (styles.MenuOpen) : ""}>
          <li>
            <button
              className={`${styles.ButtonMenu} ${activeSection === 'SessaoHome' ? 'active' : ''}`}
              onClick={() => scrollToSection('SessaoHome')}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`${styles.ButtonMenu} ${activeSection === 'SessaoSobre' ? 'active' : ''}`}
              onClick={() => scrollToSection('SessaoSobre')}
            >
              Sobre
            </button>
          </li>
          <li>
            <button
              className={`${styles.ButtonMenu} ${activeSection === 'SessaoProdutos' ? 'active' : ''}`}
              onClick={() => scrollToSection('SessaoProdutos')}
            >
              Produtos
            </button>
          </li>
          <li>
            <button
              className={`${styles.ButtonMenu} ${activeSection === 'SessaoNoticias' ? 'active' : ''}`}
              onClick={() => scrollToSection('SessaoNoticias')}
            >
              Noticias
            </button>
          </li>
          <li>
            <button
              className={`${styles.ButtonMenu} ${activeSection === 'SessaoTabelaCalibracao' ? 'active' : ''}`}
              onClick={() => scrollToSection('SessaoTabelaCalibracao')}
            >
              Tabela De Calibração
            </button>
          </li>
          <li>
            <button
              className={`${styles.ButtonMenu} ${activeSection === 'SessaoTestesStol' ? 'active' : ''}`}
              onClick={() => scrollToSection('SessaoTestesStol')}
            >
              Testes Stol
            </button>
          </li>
          <li>
            <button
              className={`${styles.ButtonMenu} ${activeSection === 'SessaoContato' ? 'active' : ''}`}
              onClick={() => scrollToSection('SessaoContato')}
            >
              Contato
            </button>
          </li>
        </ul>
      </div>
    </nav>    
  );
};
