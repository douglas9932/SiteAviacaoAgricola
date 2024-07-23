export class TBTESTES{

    IDTESTE: number = 0;
    NOMETESTE: string = '';
    DOCUMENTOTESTE: string = '';
    EXTENSAODOCUMENTO: string = '';
    DTCADASTRO: string = '';
    IDSTATUSTESTE: number = 0;
    
    public TBTESTES (parIDTESTE: number ,
        parNOMETESTE: string,
        parDOCUMENTO: string,
        parEXTENSAODOCUMENTO: string,
        parDTCADASTRO: string,
        parIDSTATUSTESTE: number,
        )
    {
        this.IDTESTE = parIDTESTE;
        this.NOMETESTE = parNOMETESTE;
        this.DOCUMENTOTESTE = parDOCUMENTO;
        this.EXTENSAODOCUMENTO = parEXTENSAODOCUMENTO;
        this.DTCADASTRO = parDTCADASTRO;
        this.IDSTATUSTESTE = parIDSTATUSTESTE;

        return this;
    }
}