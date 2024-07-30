import React, { useEffect, useMemo, useState } from 'react';
import CardProdutos from "../Componentes/CardProdutos";
import Focar from "../Componentes/Focar";
import styles from './SessaoProdutos.module.css';
import { TBPRODUTOS } from '../Classes/Tabelas/TBPRODUTOS';
import { FrmProdutosController } from './Controllers/FrmProdutosController';
import { useNavigate } from 'react-router-dom';
import ImgExpandirSessao from '../Imagens/Icones/ExpandirSessao.svg';
import ImgMinimizarSessao from '../Imagens/Icones/ImgMinimizarSessao.svg';

export const SessaoProdutos = () => {
  const navigate = useNavigate();
  
  const QtdPdodutos = 10;
  const controller = useMemo(() => new FrmProdutosController(), []);
  const [ObjLstProdutos, setObjLstProdutos ] = useState<TBPRODUTOS[] | []>();
  const [visibleProducts, setVisibleProducts] = useState(QtdPdodutos);

  const BtnDetalharProdutoClick= (IDPRODUTO: number) => {

    try{
      sessionStorage.setItem('DetalharProdutoID', IDPRODUTO.toString());
      navigate("/DetalharProduto");  
    }catch{

    }
  }

  useEffect(() => {
    
    const BuscarDadosProdutos = async () => {

      await controller.GetProdutos();    
      setObjLstProdutos(controller.ObjLstProdutos);
    }
    BuscarDadosProdutos();

  }, [controller]);

  const BtnVerMais_Click = () => {
    setVisibleProducts((prev) => prev + QtdPdodutos);
  };

  const BtnVerMenos_Click = () => {

    if((visibleProducts - QtdPdodutos) < QtdPdodutos){
      setVisibleProducts(QtdPdodutos);
    }else{
      setVisibleProducts((prev) => prev - QtdPdodutos);
    }
  };

  return (
    <div className={styles.SessaoProdutos}>
        <Focar id="SessaoProdutos"/>
        <div className={styles.TituloSessao}>
            <label>Produtos</label>
            <div></div>
        </div>
        <div className={styles.LinhaCards}>        

        {ObjLstProdutos?.slice(0, visibleProducts).map((produto) => (
          <CardProdutos IDPRODUTO={produto.IDPRODUTO} Titulo={produto.NOMEPRODUTO} TextoComplementar={produto.DESCRICAOPRODUTO} srcImagem={produto.IMAGEMCAPA} onClickBotao={()=>BtnDetalharProdutoClick(produto.IDPRODUTO)}/>
        ))}
        </div>
        
        {visibleProducts < (ObjLstProdutos?.length ?? 0 ) && (
          <div className={styles.TextBox} style={{maxWidth: '300px'}}>
            <button className={'BotoesVerMaisVerMenos'} onClick={BtnVerMais_Click}>
              <label className={styles.TextLabel}>Mostrar mais produtos</label>
              <img className={styles.ImagemBotaoSobreNos} alt='' src={ImgExpandirSessao}></img>
            </button>
          </div>  
        )}

        {visibleProducts > QtdPdodutos && (
          <div className={styles.TextBox} style={{maxWidth: '300px'}}>
            <button className={'BotoesVerMaisVerMenos'} onClick={BtnVerMenos_Click}>
              <label className={styles.TextLabel}>Mostrar menos produtos</label>
              <img alt='' src={ImgMinimizarSessao}></img>
            </button>
          </div>  
        )}
    </div>
  );  
};