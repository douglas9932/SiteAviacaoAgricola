import React, { useEffect, useMemo, useState } from 'react';
import CardProdutos from "../Componentes/CardProdutos";
import Focar from "../Componentes/Focar";
import styles from './Produtos.module.css';
import { TBPRODUTOS } from '../Classes/Tabelas/TBPRODUTOS';
import { FrmProdutosController } from './Controllers/FrmProdutosController';
import { useNavigate } from 'react-router-dom';

export const Produtos = () => {
  const navigate = useNavigate();
  
  const controller = useMemo(() => new FrmProdutosController(), []);
  const [ObjLstProdutos, setObjLstProdutos ] = useState<TBPRODUTOS[] | []>();

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


  return (
    <div className={styles.SessaoProdutos}>
        <Focar id="SessaoProdutos"/>
        <div className={styles.TituloSessao}>
            <label >Produtos</label>
            <div></div>
        </div>
        <div className={styles.LinhaCards}>        

        {ObjLstProdutos?.map((produto) => (
          <CardProdutos IDPRODUTO={produto.IDPRODUTO} Titulo={produto.NOMEPRODUTO} TextoComplementar={produto.DESCRICAOPRODUTO} srcImagem={produto.IMAGEMCAPA} onClickBotao={()=>BtnDetalharProdutoClick(produto.IDPRODUTO)}/>
        ))}
        </div>
        
    </div>
  );  
};