export class TBNOTICIAS{

    IDNOTICIA: number = 0;
    TITULONOTICIA: string = '';
    DESCRICAONOTICIA: string = '';
    IMAGEMCAPA: string = '';
    DTCADASTRO: string = '';
    IDSTATUSNOTICIA: number = 0;
    
    public TBNOTICIAS (parIDNOTICIA: number ,
        parTITULONOTICIA: string,
        parDESCRICAONOTICIA: string,
        parDTCADASTRO: string,
        parIMAGEMCAPA: string,
        parIDSTATUSNOTICIA: number,
        )
    {
        this.IDNOTICIA = parIDNOTICIA;
        this.TITULONOTICIA = parTITULONOTICIA;
        this.DESCRICAONOTICIA = parDESCRICAONOTICIA;
        this.IMAGEMCAPA = parIMAGEMCAPA;
        this.DTCADASTRO = parDTCADASTRO;
        this.IDSTATUSNOTICIA = parIDSTATUSNOTICIA;

        return this;
    }
}