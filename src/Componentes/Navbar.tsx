import React, { useEffect, useState } from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";
import imageLogo from '../Imagens/LogoStoll.png';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState('SessaoHome'); // Estado para acompanhar a seção ativa


  // // Função para atualizar a seção ativa ao rolar a página
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
  // const updateActiveSection = () => {
  //   //const SessaoHome = document.getElementById('SessaoHome');
  //   const SessaoSobre = document.getElementById('SessaoSobre');
  //   const SessaoProdutos = document.getElementById('SessaoProdutos');
  //   const SessaoNoticias = document.getElementById('SessaoNoticias');
  //   const SessaoTabelaCalibracao = document.getElementById('SessaoTabelaCalibracao');
  //   const SessaoTestesStol = document.getElementById('SessaoTestesStol');
  //   const SessaoContato = document.getElementById('SessaoContato');



  //   if (SessaoContato && window.scrollY >= SessaoContato.offsetTop - 200) 
  //   {
  //     setActiveSection('SessaoContato');
  //   } 
  //   else if (SessaoTestesStol && window.scrollY >= SessaoTestesStol.offsetTop - 200) 
  //   {
  //     setActiveSection('SessaoTestesStol');
  //   } 
  //   else if (SessaoTabelaCalibracao && window.scrollY >= SessaoTabelaCalibracao.offsetTop - 200) 
  //   {
  //     setActiveSection('SessaoTabelaCalibracao');
  //   } 
  //   else if (SessaoNoticias && window.scrollY >= SessaoNoticias.offsetTop - 200) 
  //   {
  //     setActiveSection('SessaoNoticias');
  //   } 
  //   else if (SessaoProdutos && window.scrollY >= SessaoProdutos.offsetTop - 200) 
  //   {
  //     setActiveSection('SessaoProdutos');
  //   } 
  //   else if (SessaoSobre && window.scrollY >= SessaoSobre.offsetTop - 200) 
  //   {
  //     setActiveSection('SessaoSobre');
  //   } 
  //   else 
  //   {
  //     setActiveSection('SessaoHome');
  //   }
  // };

  // Efeito para adicionar evento de scroll ao montar o componente
  useEffect(() => {
    window.addEventListener('scroll', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, []);

  //Evento para focar nas sessões desejadas
  const scrollToSection = (sectionId: string) => {
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
          <img src={imageLogo} alt="Description" />
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
