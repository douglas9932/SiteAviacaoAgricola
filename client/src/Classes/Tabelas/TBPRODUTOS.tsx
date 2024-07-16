export class TBPRODUTOS{

    IDPRODUTO: number = 0;
    NOMEPRODUTO: string = '';
    DESCRICAOPRODUTO: string = '';
    DTCADASTRO: string = '';
    IMAGEMCAPA: string = '';
    IMAGEMPRODUTOEXPANDIDO: string = '';
    IDSTATUSPRODUTO: number = 0;
    
    public TBPRODUTOS (parIDPRODUTO: number ,
        parNOMEPRODUTO: string,
        parDESCRICAOPRODUTO: string,
        parDTCADASTRO: string,
        parIMAGEMCAPA: string,
        parIMAGEMPRODUTOEXPANDIDO: string,
        parIDSTATUSPRODUTO: number,
        )
    {
        this.IDPRODUTO = parIDPRODUTO;
        this.NOMEPRODUTO = parNOMEPRODUTO;
        this.DESCRICAOPRODUTO = parDESCRICAOPRODUTO;
        this.DTCADASTRO = parDTCADASTRO;
        this.IMAGEMCAPA = parIMAGEMCAPA;
        this.IMAGEMPRODUTOEXPANDIDO = parIMAGEMPRODUTOEXPANDIDO;
        this.IDSTATUSPRODUTO = parIDSTATUSPRODUTO;

        return this;
    }
}