import React, { FunctionComponent } from 'react';
import styles from './ModeloVazio.module.css';
import Menu from '../Componentes/Menu';


type ButtonsType = {
    children: any
};

const ModeloVazio: FunctionComponent<ButtonsType> = ({children}) => {
  return (
    <div className={styles.modelo_vazio}>
      <Menu />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default ModeloVazio;
