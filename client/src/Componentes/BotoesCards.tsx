import React, { FunctionComponent } from 'react';
import styles from './BotoesCards.module.css'

type ButtonsType = {
    LinkReferencia?: string;
    Texto: string;
    onClick: () => void;
}
const BotoesCards: FunctionComponent<ButtonsType> = ({LinkReferencia, Texto, onClick}) => {


    return (
        <div className={styles.BotoesCards} onClick={onClick}>            
            <a href={LinkReferencia} className={styles.Texto} target="">{Texto}</a>
        </div>
    )}

export default BotoesCards;