import React, { FunctionComponent } from 'react';
import './ModeloVazio.css';
import Menu from '../Componentes/Menu';


type ButtonsType = {
    children: any
};

const ModeloVazio: FunctionComponent<ButtonsType> = ({children}) => {
  return (
    <div className="modelo-vazio">
      <Menu />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default ModeloVazio;
