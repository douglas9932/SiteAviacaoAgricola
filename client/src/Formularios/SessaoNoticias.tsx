import React, { useEffect, useMemo, useState } from 'react';
import CardNoticias from "../Componentes/CardNoticias";
import Focar from "../Componentes/Focar";
import styles from './SessaoNoticias.module.css';
import { TBNOTICIAS } from '../Classes/Tabelas/TBNOTICIAS';
import { FrmNoticiasController } from './Controllers/FrmNoticiasController';
import { useNavigate } from 'react-router-dom';

export const SessaoNoticias = () => {
  const navigate = useNavigate();
  
  const controller = useMemo(() => new FrmNoticiasController(), []);
  const [ObjLstNoticias, setObjLstNoticias ] = useState<TBNOTICIAS[] | []>();

  const BtnDetalharNoticiaClick= (IDNoticia: number) => {

    try{
      sessionStorage.setItem('DetalharNoticiaID', IDNoticia.toString());
      navigate("/DetalharNoticia");  
    }catch{

    }
  }

  useEffect(() => {
    
    const BuscarDadosNoticias = async () => {

      await controller.GetNoticias();    
      setObjLstNoticias(controller.ObjLstNoticias);
    }
    BuscarDadosNoticias();

  }, [controller]);


  return (
    <div className={styles.SessaoNoticias}>
        <Focar id="SessaoNoticias"/>
        <div className={styles.TituloSessao}>
            <label >Noticias</label>
            <div></div>
        </div>
        <div className={styles.LinhaCards}>        

        {ObjLstNoticias?.map((Noticia) => (
          <CardNoticias IDNOTICIA={Noticia.IDNOTICIA} Titulo={Noticia.TITULONOTICIA} TextoComplementar={Noticia.DESCRICAONOTICIA} srcImagem={Noticia.IMAGEMCAPA} onClickBotao={()=>BtnDetalharNoticiaClick(Noticia.IDNOTICIA)}/>
        ))}
        </div>
        
    </div>
  );  
  
};