import React, { useEffect, useMemo, useState } from 'react';
 import CardTestes from "../Componentes/CardTestes";
import Focar from "../Componentes/Focar";
import styles from './SessaoTestes.module.css';
import { TBTESTES } from '../Classes/Tabelas/TBTESTES';
import { FrmTestesController } from './Controllers/FrmTestesController';

export const SessaoTestes = () => {
    
  const controller = useMemo(() => new FrmTestesController(), []);
  const [ObjLstTestes, setObjLstTestes ] = useState<TBTESTES[] | []>();

  useEffect(() => {
    
    const BuscarDadosTestes = async () => {

      await controller.GetTestes();    
      setObjLstTestes(controller.ObjLstTestes);
    }
    BuscarDadosTestes();

  }, [controller]);


  return (
    <div className={styles.SessaoTestes}>
        <Focar id="SessaoTestesStol"/>
        <div className={styles.TituloSessao}>
            <label >Testes</label>
            <div></div>
        </div>
        <div className={styles.LinhaCards}>
            {ObjLstTestes?.map((Teste) => (
            <CardTestes IDTESTE={Teste.IDTESTE} Titulo={Teste.NOMETESTE} arquivoBase64={Teste.DOCUMENTOTESTE} Extensao={Teste.EXTENSAODOCUMENTO}/>
            ))}
        </div>
        
    </div>
  );  
  
};