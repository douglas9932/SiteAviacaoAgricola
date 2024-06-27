import React, { useEffect, useState } from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";
import imageLogo from '../Imagens/LogoStoll.png';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  const updateScreenSize = () => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight });
  };

  // Efeito para adicionar evento de scroll ao montar o componente
  useEffect(() => {
    window.addEventListener('scroll', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      
    };
    
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateScreenSize);
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);


  //Evento para focar nas sessões desejadas
  const scrollToSection = (sectionId: string) => {

    setMenuOpen(false);

    const section = document.getElementById(sectionId);
    if (section) {
      const navbarElement = document.querySelector('nav');
      if (navbarElement) {
        const navbarHeight = navbarElement.offsetHeight;
        const heading = section.querySelector('h1');
        if (heading) {
          window.scrollTo({
            top: heading.offsetTop - navbarHeight,
            behavior: 'smooth',
          });
        } else {
          window.scrollTo({
            top: section.offsetTop - navbarHeight,
            behavior: 'smooth',
          });
        }
      }
    }
  };
  
  return (
    <nav>
       <div className="container">
        <div className="image-container">
        <Link to="/" className="title">
          <img src={imageLogo} alt="Description" className= "responsive-image"  onClick={() => scrollToSection('SessaoHome')}/>
        </Link>
        </div>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <button
              className={`ButtonMenu ${activeSection === 'SessaoHome' ? 'active' : ''}`}
              onClick={() => scrollToSection('SessaoHome')}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`ButtonMenu ${activeSection === 'SessaoSobre' ? 'active' : ''}`}
              onClick={() => scrollToSection('SessaoSobre')}
            >
              Sobre
            </button>
          </li>
          <li>
            <button
              className={`ButtonMenu ${activeSection === 'SessaoProdutos' ? 'active' : ''}`}
              onClick={() => scrollToSection('SessaoProdutos')}
            >
              Produtos
            </button>
          </li>
          <li>
            <button
              className={`ButtonMenu ${activeSection === 'SessaoNoticias' ? 'active' : ''}`}
              onClick={() => scrollToSection('SessaoNoticias')}
            >
              Noticias
            </button>
          </li>
          <li>
            <button
              className={`ButtonMenu ${activeSection === 'SessaoTabelaCalibracao' ? 'active' : ''}`}
              onClick={() => scrollToSection('SessaoTabelaCalibracao')}
            >
              Tabela De Calibracao
            </button>
          </li>
          <li>
            <button
              className={`ButtonMenu ${activeSection === 'SessaoTestesStol' ? 'active' : ''}`}
              onClick={() => scrollToSection('SessaoTestesStol')}
            >
              Testes Stol
            </button>
          </li>
          <li>
            <button
              className={`ButtonMenu ${activeSection === 'SessaoContato' ? 'active' : ''}`}
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
