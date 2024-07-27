import React, { useEffect, useMemo, useState } from 'react';
import Focar from "../Componentes/Focar";
import styles from './SessaoSobreNos.module.css';
import { TBEMPRESA } from '../Classes/Tabelas/TBEMPRESA';
import { FrmInformacoesEmpresaController } from './Controllers/FrmInformacoesEmpresaController';
import { useNavigate } from 'react-router-dom';

export const SessaoSobreNos = () => {
  const navigate = useNavigate();
  
  const controller = useMemo(() => new FrmInformacoesEmpresaController(), []);
  const [ObjInfoSobreNos, setObjInfoSobreNos ] = useState<TBEMPRESA>();

  const BtnDetalharNoticiaClick= (IDNoticia: number) => {

    try{
      sessionStorage.setItem('DetalharNoticiaID', IDNoticia.toString());
      navigate("/DetalharNoticia");  
    }catch{

    }
  }

  useEffect(() => {
    
    const BuscarDadosSobreNos = async () => {

      await controller.GetInformacoesDaEmpresa(setObjInfoSobreNos);    
      setObjInfoSobreNos(controller.ObjTBEMPRESA);
    }
    BuscarDadosSobreNos();

  }, [controller]);


  return (
    <div className={styles.SessaoSobreNos}>
        <Focar id="SessaoSobre"/>
        <div className={styles.TituloSessao}>
            <label>SobreNos</label>
            <div></div>
        </div>
            <div className={styles.corpo}>
               <div className={styles.imagens}>
                  <div className={styles.DivInformacoes}>
            <div className={styles.DivDescricao}>
              <label className={styles.DescricaoComplementar}>
                  Experiência em produtos, aliadas ao agricultor!
                  A 26 anos desenvolvendo métodos e aprimorando meios de
                  aplicações aéreas.
              </label>
            </div>
            <div className={styles.DivHistorico}>
              <label className={styles.TextoHistorico}>Histórico</label>
            </div>
            <div className={styles.DivDescricao}>
              <label className={styles.TextoDescricoes}>
                Stol Ltda, é uma empresa dedicada ao estudo, desenvolvimento e
                fabricação de equipamentos agrícolas para a aplicação aérea de
                produtos via sólido ou líquido. Fundada em 1988, viemos através
                destes anos desenvolvendo métodos e aprimorando meios de
                aplicações aéreas para um maior controle de pragas e doenças.
                Contando com um pessoal altamente qualificado e com muita
                tecnologia em cima de nossos produtos, mantendo um alto padrão
                de qualidade.
              </label>
            </div>
            <div className={styles.DivHistorico}>
              <label className={styles.TextoHistorico}>Objetivo</label>
            </div>
            <div className={styles.DivDescricao}>
              <label className={styles.TextoDescricoes}>
                A empresa tem como objetivo a satisfação do cliente mantendo o
                desenvolvimento e aprimoramento continuo de nossos equipamentos
                com alta qualidade.
              </label>
            </div>
                  </div>
                  <div className={styles.DivImagemSobreNos}>
              <img
                className={styles.ImagemSobreNos}
                alt=""
                src={ObjInfoSobreNos?.IMAGEMSOBRENOS}
              />
                  </div>
               </div>
            </div>


        <div className={styles.LinhaCards}>
        </div>
        
    </div>
  );  
  
};