import React, { FunctionComponent } from 'react';
import './CardProdutos.css'
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
    <div className="CardProduto">     
        <div className='DivImagem'>
          <img className='ImagemProduto' src={CaminhoImagem} alt=""></img>
        </div>

        <div className="Textos">
          <label lang="en" className="Titulo">{Titulo}</label>
          <p lang="pt" className="TextoComplementar">{TextoComplementar}</p>      
        </div>
        <div className="Botoes">
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