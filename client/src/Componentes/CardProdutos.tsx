import React, { FunctionComponent } from 'react';
import styles from './CardProdutos.module.css'
import BotoesCards from './BotoesCards';

type ButtonType = {
  LinkReferencia: string;
  Texto: string;
};

type CardsType = {
  CaminhoImagem: string;
  Titulo : string;
  TextoComplementar: string;
  Botoes: ButtonType[];
}

const CardProdutos: FunctionComponent<CardsType> = ({CaminhoImagem, Titulo, TextoComplementar, Botoes}) => {

  
  return (
    <div className={styles.CardProduto}>     
        <div className={styles.DivImagem}>
          <img className={styles.ImagemProduto} src={CaminhoImagem} alt=""></img>
        </div>

        <div className={styles.Textos}>
          <label lang="en" className={styles.Titulo}>{Titulo}</label>
          <p lang="pt" className={styles.TextoComplementar}>{TextoComplementar}</p>      
        </div>
        <div className={styles.Botoes}>
        {Botoes.map((botao, index) => (
            <BotoesCards 
              key={index} 
              LinkReferencia={botao.LinkReferencia} 
              Texto={botao.Texto} 
            />
          ))}
        </div>
    </div>
  );
}

export default CardProdutos;