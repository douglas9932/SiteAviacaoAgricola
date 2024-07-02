import React, { FunctionComponent } from 'react';
import './BotoesCards.css'

type ButtonsType = {
    LinkReferencia : string;
    Texto: string;
}
const BotoesCards: FunctionComponent<ButtonsType> = ({LinkReferencia, Texto}) => {


    return (
        <div className="BotoesCards">            
            <a href={LinkReferencia} className="Texto" target="">{Texto}</a>
        </div>
    )}

export default BotoesCards;