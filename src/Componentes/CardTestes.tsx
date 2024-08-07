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
    
  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteChars = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteChars.length);

    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

    const onClick= ()=>{
      
      if (arquivoBase64.startsWith('data:application/pdf')) {
          
        const pdfBlob = base64ToBlob(arquivoBase64, 'application/pdf');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        const htmlContent = `
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
              <iframe src="${pdfUrl}" title="${Titulo}"></iframe>
            </body>
          </html>
        `;

        const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
        const htmlUrl = URL.createObjectURL(htmlBlob);
        window.open(htmlUrl, '_blank');
          
        } else if (arquivoBase64.startsWith('data:application/msword') ||
                    arquivoBase64.startsWith('data:application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            
            const link = document.createElement('a');
            link.href = arquivoBase64;
            
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
        <label lang="pt" className={styles.Titulo}>{Titulo}</label>
      </div>
    </div>
  );
}

export default CardTestes;