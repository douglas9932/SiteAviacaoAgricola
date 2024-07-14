import React, { FunctionComponent } from 'react';
import styles from './ModalImagem.module.css'; // Você pode estilizar seu modal usando CSS Modules
    
import  ImagemClose from '../Imagens/Icones/ImgClose.svg'

interface ModalProps {
    show: boolean;
    onClose: () => void;
    srcImage: string;
    title?: string;
    description?: string;
  }

const Modal:FunctionComponent<ModalProps> = ({ show, onClose, srcImage}) => {
  if (!show) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.Header}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={ImagemClose}></img>
        </button>
        </div>
        <div className={styles.Body}>
          <img src={srcImage} alt="Imagem" className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
