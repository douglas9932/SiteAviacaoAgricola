import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './App';
import Login from './Formularios/Administracao/FrmLogin';
import ModeloVazio from './Formularios/ModeloVazio';
import HomeAdm from './Formularios/Administracao/FrmHomeAdm';
import FrmInformacoesEmpresa from './Formularios/Administracao/FrmInformacoesEmpresa';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SiteAviacaoAgricola" element={<Home />} />
      <Route  path="/login" element={<Login />} />
      <Route  path="/Administracao/Home" element={<ModeloVazio><HomeAdm /></ModeloVazio>} />
      <Route  path="/Administracao/InfoEmpresa" element={<ModeloVazio><FrmInformacoesEmpresa /></ModeloVazio>} />
    </Routes>
  );
};

export default AppRoutes;