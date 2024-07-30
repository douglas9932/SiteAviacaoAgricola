import React, { useEffect, useMemo, useState } from 'react';
import CardNoticias from "../Componentes/CardNoticias";
import Focar from "../Componentes/Focar";
import styles from './SessaoNoticias.module.css';
import { TBNOTICIAS } from '../Classes/Tabelas/TBNOTICIAS';
import { FrmNoticiasController } from './Controllers/FrmNoticiasController';
import { useNavigate } from 'react-router-dom';
import ImgExpandirSessao from '../Imagens/Icones/ExpandirSessao.svg';
import ImgMinimizarSessao from '../Imagens/Icones/ImgMinimizarSessao.svg';

export const SessaoNoticias = () => {
  const navigate = useNavigate();
  
  const QtdNoticias = 2;
  const controller = useMemo(() => new FrmNoticiasController(), []);
  const [ObjLstNoticias, setObjLstNoticias ] = useState<TBNOTICIAS[] | []>();
  const [visibleNoticias, setvisibleNoticias] = useState(QtdNoticias);

  const BtnDetalharNoticiaClick= (IDNoticia: number) => {

    try{
      const noticia = ObjLstNoticias?.find(noticia => noticia.IDNOTICIA === IDNoticia);

      if (noticia) {
        
        const serializedNoticia = JSON.stringify(noticia);

        sessionStorage.setItem('parObjNOTICIAS', serializedNoticia);

        navigate("/DetalharNoticia");
    } 
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

  const BtnVerMais_Click = () => {
    setvisibleNoticias((prev) => prev + QtdNoticias);
  };

  const BtnVerMenos_Click = () => {

    if((visibleNoticias - QtdNoticias) < QtdNoticias){
      setvisibleNoticias(QtdNoticias);
    }
    else{
      setvisibleNoticias((prev) => prev - QtdNoticias);
    }
  };

  return (
    <div className={styles.SessaoNoticias}>
        <Focar id="SessaoNoticias"/>
        <div className={styles.TituloSessao}>
            <label >Noticias</label>
            <div></div>
        </div>
        <div className={styles.LinhaCards}>        

        {ObjLstNoticias?.slice(0, visibleNoticias).map((Noticia) => (
          <CardNoticias IDNOTICIA={Noticia.IDNOTICIA} Titulo={Noticia.TITULONOTICIA} TextoComplementar={Noticia.DESCRICAONOTICIA} srcImagem={Noticia.IMAGEMCAPA} onClickBotao={()=>BtnDetalharNoticiaClick(Noticia.IDNOTICIA)}/>
        ))}
        </div>
        
        {visibleNoticias < (ObjLstNoticias?.length ?? 0 ) && (
          <div className={styles.TextBox} style={{maxWidth: '300px'}}>
            <button className={'BotoesVerMaisVerMenos'} onClick={BtnVerMais_Click}>
              <label className={styles.TextLabel}>Mostrar mais notícias</label>
              <img className={styles.ImagemBotaoSobreNos} alt='' src={ImgExpandirSessao}></img>
            </button>
          </div>  
        )}

        {visibleNoticias > QtdNoticias && (
          <div className={styles.TextBox} style={{maxWidth: '300px'}}>
            <button className={'BotoesVerMaisVerMenos'} onClick={BtnVerMenos_Click}>
              <label className={styles.TextLabel}>Mostrar menos notícias</label>
              <img alt='' src={ImgMinimizarSessao}></img>
            </button>
          </div>  
        )}

    </div>
  );  
  
};