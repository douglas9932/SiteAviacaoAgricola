import React, { FunctionComponent } from 'react';
import styles from './CardNoticias.module.css'
import BotoesCards from './BotoesCards';

type CardsType = {
  IDNOTICIA: number;  
  srcImagem: string;
  Titulo : string;
  TextoComplementar: string;
  onClickBotao: () => void;
}

const CardNoticias: FunctionComponent<CardsType> = ({srcImagem, Titulo, TextoComplementar, onClickBotao}) => {

  return (
    <div className={styles.CardNoticia}>     
        <div className={styles.DivImagem}>
          <img className={styles.ImagemNoticia} src={srcImagem} alt=""></img>
        </div>

        <div className={styles.Informacoes}>
          <div className={styles.Textos}>
            <label lang="en" className={styles.Titulo}>{Titulo}</label>
            <p lang="pt" className={styles.TextoComplementar} dangerouslySetInnerHTML={{ __html: TextoComplementar.replace(/\n/g, '<br/>') ?? '' }}/> 
          </div>

          <div className={styles.Botoes}>
            <BotoesCards  
                className={styles.BotaoVerMais}
                onClick={onClickBotao}
                Texto='Ver Mais Detalhes' 
              />
          </div>
        </div>
    </div>
  );
}

export default CardNoticias;