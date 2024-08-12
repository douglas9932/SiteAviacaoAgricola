import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './App';
import Login from './Formularios/Administracao/FrmLogin';
import ModeloVazio from './Formularios/ModeloVazio';
import HomeAdm from './Formularios/Administracao/FrmHomeAdm';
import FrmInformacoesEmpresa from './Formularios/Administracao/FrmInformacoesEmpresa';
import FrmImagensCarousel from './Formularios/Administracao/FrmImagensCarousel';
import FrmGerContatos from './Formularios/Administracao/FrmGerContatos';
import FrmGerProdutos from './Formularios/Administracao/FrmGerProdutos';
import FrmGerNoticias from './Formularios/Administracao/FrmGerNoticias';
import FrmGerTestes from './Formularios/Administracao/FrmGerTestes';
import FrmDetalharProduto from './Formularios/FrmDetalharProduto';
import FrmDetalharNoticia from './Formularios/FrmDetalharNoticia';
import NotFoundPage from './Formularios/NotFoundPage'; // Página 404

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SiteAviacaoAgricola" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Administracao/Home" element={<ModeloVazio><HomeAdm /></ModeloVazio>} />
      <Route path="/Administracao/InfoEmpresa" element={<ModeloVazio><FrmInformacoesEmpresa /></ModeloVazio>} />
      <Route path="/Administracao/ImagensCarousel" element={<ModeloVazio><FrmImagensCarousel /></ModeloVazio>} />
      <Route path="/Administracao/Contatos" element={<ModeloVazio><FrmGerContatos /></ModeloVazio>} />
      <Route path="/Administracao/Produtos" element={<ModeloVazio><FrmGerProdutos /></ModeloVazio>} />
      <Route path="/Administracao/Noticias" element={<ModeloVazio><FrmGerNoticias /></ModeloVazio>} />
      <Route path="/Administracao/Testes" element={<ModeloVazio><FrmGerTestes /></ModeloVazio>} />
      <Route path="/DetalharProduto" element={<FrmDetalharProduto />} />
      <Route path="/DetalharNoticia" element={<FrmDetalharNoticia/>} />





      
      <Route element={<NotFoundPage />} />

    </Routes>
  );
};

export default AppRoutes;