import React, { useEffect, useMemo, useState } from 'react';
import Focar from "../Componentes/Focar";
import styles from './SessaoSobreNos.module.css';
import { TBEMPRESA } from '../Classes/Tabelas/TBEMPRESA';
import { FrmInformacoesEmpresaController } from './Controllers/FrmInformacoesEmpresaController';

export const SessaoSobreNos = () => {
    
  const controller = useMemo(() => new FrmInformacoesEmpresaController(), []);
  const [ObjInfoSobreNos, setObjInfoSobreNos ] = useState<TBEMPRESA>();

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
            <label>Sobre nósix</label>
            <div></div>
        </div>

        <div className={styles.corpo}>
          <div className={styles.imagens}>
            <div className={styles.DivInformacoes}>
              <div className={styles.DivDescricao}>
                <label className={styles.TextoDescricoes}
                dangerouslySetInnerHTML={{ __html: ObjInfoSobreNos?.DESCRICAOSOBRENOS.replace(/\n/g, '<br/>') ?? '' }}>
                </label>
              </div>
              <div className={styles.DivHistorico}>
                <label className={styles.TextoHistorico}>Histórico</label>
              </div>
              <div className={styles.DivDescricao}>
                <label className={styles.TextoDescricoes}
                dangerouslySetInnerHTML={{ __html: ObjInfoSobreNos?.HISTORICOSOBRENOS.replace(/\n/g, '<br/>') ?? '' }}>
                </label>
              </div>
              <div className={styles.DivHistorico}>
                <label className={styles.TextoHistorico}>Objetivo</label>
              </div>
              <div className={styles.DivDescricao}>
                <label className={styles.TextoDescricoes}
                dangerouslySetInnerHTML={{ __html: ObjInfoSobreNos?.OBJETIVOSOBRENOS.replace(/\n/g, '<br/>') ?? '' }}>
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