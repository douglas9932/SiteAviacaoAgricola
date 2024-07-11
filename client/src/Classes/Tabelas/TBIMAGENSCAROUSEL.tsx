export class TBIMAGENSCAROUSEL{

    public IDIMAGEM: number = 0;
    public DTCADASTRO: string = '';
    public SCRIMAGEM: string = '';
    public NOMEIMAGEM: string = '';
    public IDSTATUSIMAGEM: number = 0;

    
    public TBIMAGENSCAROUSEL (
        parIDIMAGEM:number,
        parDTCADASTRO:string,
        parSCRIMAGEM:string,
        parNOMEIMAGEM:string,
        parIDSTATUSIMAGEM:number,        
        )
    {
        this.IDIMAGEM = parIDIMAGEM;
        this.DTCADASTRO = parDTCADASTRO;
        this.SCRIMAGEM = parSCRIMAGEM;
        this.NOMEIMAGEM = parNOMEIMAGEM;
        this.IDSTATUSIMAGEM = parIDSTATUSIMAGEM;      

        return this;
    }

}