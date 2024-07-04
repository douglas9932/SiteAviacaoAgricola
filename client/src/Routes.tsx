import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './App';
import Login from './Formularios/Administracao/FrmLogin';
import HomeAdm from './Formularios/Administracao/FrmHomeAdm';
import ModeloVazio from './Formularios/ModeloVazio';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SiteAviacaoAgricola" element={<Home />} />
      <Route  path="/login" element={<Login />} />
      <Route  path="/Administracao/Home" element={<ModeloVazio><HomeAdm /></ModeloVazio>} />
    </Routes>
  );
};

export default AppRoutes;