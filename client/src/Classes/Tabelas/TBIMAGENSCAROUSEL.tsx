export class TBIMAGENSCAROUSEL{

    public IDIMAGEM: number = 0;
    public DTCADASTRO: string = '';
    public _SCRIMAGEM: string = '';
    public NOMEIMAGEM: string = '';
    public IDSTATUSIMAGEM: number = 0;

    get SCRIMAGEM(): string {
        return this._SCRIMAGEM;
      }
    
    set SCRIMAGEM(value: string) {
    this._SCRIMAGEM = value;
    }

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