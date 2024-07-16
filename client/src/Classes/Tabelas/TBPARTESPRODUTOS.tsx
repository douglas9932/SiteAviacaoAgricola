export class TBPARTESPRODUTOS{

    IDPARTE: number = 0;
    IDPRODUTO: number = 0;
    NUMEROPARTE: number = 0;
    DESCRICAOPARTE: string = '';
    IDSTATUSPARTE: number = 0;
    
    public TBPARTESPRODUTOS (parIDPARTE: number ,
        parIDPRODUTO: number,
        parNUMEROPARTE: number,
        parDESCRICAOPARTE: string,
        parIDSTATUSPARTE: number,
        )
    {
        this.IDPARTE = parIDPARTE;
        this.IDPRODUTO = parIDPRODUTO;
        this.NUMEROPARTE = parNUMEROPARTE;
        this.DESCRICAOPARTE = parDESCRICAOPARTE;
        this.IDSTATUSPARTE = parIDSTATUSPARTE;

        return this;
    }
}