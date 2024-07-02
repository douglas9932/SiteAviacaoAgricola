import React from 'react';
import CardProdutos from "../Componentes/CardProdutos";
import Focar from "../Componentes/Focar";
import './Produtos.css'

import Produto1 from '../Imagens/Produtos/Produto1.png';
import Produto2 from '../Imagens/Produtos/Produto2.jpg';
import Produto3 from '../Imagens/Produtos/Produto3.jpeg';


const botaoData1 = [
  { LinkReferencia: 'https://www.google.com.br/?hl=pt-BR', Texto: 'CATÁLOGO' },
  { LinkReferencia: '/pdfs/catalogos/arquivo.pdf', Texto: 'Botao 2' },
  { LinkReferencia: '/botao3', Texto: 'Botao 3' }
];

const botaoData2 = [
  { LinkReferencia: '/catalogo', Texto: 'CATÁLOGO' },
  { LinkReferencia: '/botao4', Texto: 'Botao 4' },
  { LinkReferencia: '/botao5', Texto: 'Botao 5' }
];

export const Produtos = () => {
  return (
    <div className='SessaoProdutos'>
        <Focar id="SessaoProdutos"/>
        <div className="TituloSessao">
            <label >Produtos</label>
            <div></div>
        </div>
        <div className='LinhaCards'>
            <CardProdutos Titulo="Atomizador de Alumínio" TextoComplementar="Texto Complementar" CaminhoImagem={Produto1} Botoes={botaoData1}/>
            <CardProdutos  Titulo="Caixa de Alijamento Ipanema 201 – 202 – 203" TextoComplementar="Texto Complementar" CaminhoImagem={Produto2} Botoes={botaoData2}/>
        </div>
        <div className='LinhaCards'>
            <CardProdutos Titulo="Rebocador de Aeronaves" TextoComplementar="Texto Complementar" CaminhoImagem={Produto3} Botoes={botaoData1}/>
            <CardProdutos  Titulo="Titulo" TextoComplementar="Texto Complementar" CaminhoImagem="./Imagens/Produtos/Produto1.png" Botoes={botaoData2}/>
        </div>
    </div>
  );  
};