export class TBCONTATOS{

    IDCONTATO: number = 0;
    NMCIDADECONTATO: string = '';
    EMAILCONTATO: string = '';
    ENDERECO: string = '';
    TELEFONE: string = '';
    CELULAR: string = '';
    IDSTATUSCONTATO: number = 0;
    
    public TBCONTATOS (parIDCONTATO: number ,
        parNMCIDADECONTATO: string,
        parEMAILCONTATO: string,
        parENDERECO: string,
        parTELEFONE: string,
        parCELULAR: string,
        parIDSTATUSCONTATO: number,
        )
    {
        this.IDCONTATO = parIDCONTATO;
        this.NMCIDADECONTATO = parNMCIDADECONTATO;
        this.EMAILCONTATO = parEMAILCONTATO;
        this.ENDERECO = parENDERECO;
        this.TELEFONE = parTELEFONE;
        this.CELULAR = parCELULAR;
        this.IDSTATUSCONTATO = parIDSTATUSCONTATO;

        return this;
    }

}