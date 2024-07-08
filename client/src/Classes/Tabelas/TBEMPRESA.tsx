export class TBEMPRESAS{

    public IDEMPRESA: number = 0;
    public NOMEFANTASIA: string = '';
    public RAZAOSOCIAL: string = '';
    public CNPJ: string = '';
    public INSCRICAOESTADUAL: string = '';
    public ENDERECO: string = '';
    public TELEFONE: string = '';    
    public CELULAR: string = '';
    public SEGMENTO: string = '';
    public DATAABERTURA: string = '';
    public RESPONSAVEL: string = '';
    public CPFRESPONSAVEL: string = '';
    public EXTENSAO_LOGO_236X67: string = '';
    public LOGO_236X67: string = '';
    public EXTENSAO_ICONE: string = '';
    public ICONE: string = '';
    public IDSTATUSEMPRESA: number = 0;

    
    public TBEMPRESAS (parIDEMPRESA: number ,
        parNOMEFANTASIA: string,
        parRAZAOSOCIAL: string,
        parCNPJ: string,
        parINSCRICAOESTADUAL: string,
        parTELEFONE: string,
        parCELULAR: string,
        parENDERECO: string,
        parSEGMENTO: string,
        parDATAABERTURA: string,
        parRESPONSAVEL: string,
        parCPFRESPONSAVEL: string,
        parEXTENSAO_LOGO_236X67: string ,
        parLOGO_236X67: string ,
        parEXTENSAO_ICONE: string,
        parICONE: string,
        parIDSTATUSEMPRESA: number 
        )
    {
        this.IDEMPRESA = parIDEMPRESA;
        this.NOMEFANTASIA = parNOMEFANTASIA;
        this.RAZAOSOCIAL = parRAZAOSOCIAL;
        this.CNPJ = parCNPJ;
        this.INSCRICAOESTADUAL = parINSCRICAOESTADUAL;
        this.ENDERECO = parENDERECO;
        this.TELEFONE = parTELEFONE;
        this.CELULAR = parCELULAR;
        this.SEGMENTO = parSEGMENTO;
        this.DATAABERTURA = parDATAABERTURA;
        this.RESPONSAVEL = parRESPONSAVEL;
        this.CPFRESPONSAVEL = parCPFRESPONSAVEL;
        this.EXTENSAO_LOGO_236X67 = parEXTENSAO_LOGO_236X67;
        this.LOGO_236X67 = parLOGO_236X67;
        this.EXTENSAO_ICONE = parEXTENSAO_ICONE;
        this.ICONE = parICONE;
        this.IDSTATUSEMPRESA = parIDSTATUSEMPRESA;

        return this;
    }

}