import React, { FunctionComponent } from 'react';
import styles from './CardTestes.module.css'

import IconDownLoad from '../Imagens/Icones/BaixarPDF.svg'

type CardsType = {
  IDTESTE: number;  
  arquivoBase64: string;
  Titulo : string;
  Extensao : string;
}

  

const CardTestes: FunctionComponent<CardsType> = ({arquivoBase64, Titulo, Extensao}) => {
    
    const onClick= ()=>{
        // Identificar o tipo MIME do arquivo Base64
        if (arquivoBase64.startsWith('data:application/pdf')) {
            // Se for um PDF, abra em uma nova aba
            const pdfWindow = window.open();
            if (pdfWindow) {

                if (pdfWindow) {
                    pdfWindow.document.open();
                    pdfWindow.document.write(`
                      <html>
                        <head>
                          <title>${Titulo}</title>
                          <style>
                            body {
                              margin: 0;
                              padding: 0;
                              overflow: hidden;
                            }
                            iframe {
                              width: 100vw;
                              height: 100vh;
                              border: none;
                            }
                          </style>
                        </head>
                        <body>
                          <iframe src="${arquivoBase64}" title="${Titulo}"></iframe>
                        </body>
                      </html>
                    `);
                    pdfWindow.document.close();
                  }
            }
        } else if (arquivoBase64.startsWith('data:application/msword') ||
                    arquivoBase64.startsWith('data:application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            //Se for um arquivo Word, faça o download
            const link = document.createElement('a');
            link.href = arquivoBase64;
            // O nome do arquivo pode ser ajustado conforme necessário
            link.download = Titulo + Extensao; 
            link.click();
        } else {
            console.error('Tipo de arquivo não suportado.');
        }
    }

  return (
    <div className={styles.CardTeste} onClick={onClick}>
      <img src={IconDownLoad} alt={Titulo} className={styles.Imagem} />
      <div className={styles.Informacoes}>
        <label lang="en" className={styles.Titulo}>{Titulo}</label>
      </div>
    </div>
  );
}

export default CardTestes;