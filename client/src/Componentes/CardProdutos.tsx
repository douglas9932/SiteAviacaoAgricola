import React, { FunctionComponent } from 'react';
import styles from './CardProdutos.module.css'
import BotoesCards from './BotoesCards';

type CardsType = {
  IDPRODUTO: number;  
  srcImagem: string;
  Titulo : string;
  TextoComplementar: string;
  onClickBotao: () => void;
}

const CardProdutos: FunctionComponent<CardsType> = ({srcImagem, Titulo, TextoComplementar, onClickBotao}) => {


  
  return (
    <div className={styles.CardProduto}>     
        <div className={styles.DivImagem}>
          <img className={styles.ImagemProduto} src={srcImagem} alt=""></img>
        </div>

        <div className={styles.Textos}>
          <label lang="en" className={styles.Titulo}>{Titulo}</label>
          <p lang="pt" className={styles.TextoComplementar}>{TextoComplementar}</p>      
        </div>
        <div className={styles.Botoes}>
        <BotoesCards  
              onClick={onClickBotao}
              Texto='Detalhar Produto' 
            />
        </div>
    </div>
  );
}

export default CardProdutos;