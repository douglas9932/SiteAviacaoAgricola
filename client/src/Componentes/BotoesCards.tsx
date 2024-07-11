import React, { FunctionComponent } from 'react';
import styles from './BotoesCards.module.css'

type ButtonsType = {
    LinkReferencia : string;
    Texto: string;
}
const BotoesCards: FunctionComponent<ButtonsType> = ({LinkReferencia, Texto}) => {


    return (
        <div className={styles.BotoesCards}>            
            <a href={LinkReferencia} className={styles.Texto} target="">{Texto}</a>
        </div>
    )}

export default BotoesCards;