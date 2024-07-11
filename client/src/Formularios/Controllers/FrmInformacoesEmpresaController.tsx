import { TBEMPRESAS } from "../../Classes/Tabelas/TBEMPRESA";
import API from '../../Classes/API';
import { Comum } from "../../Classes/Comum";


export class FrmInformacoesEmpresaController{
      
    public ObjTBEMPRESA: TBEMPRESAS = new TBEMPRESAS;

    private maxSizeLogo = 1 * 1024 * 1024; // Tamanho máximo da imagem em bytes (1 MB)
    private maxWidthLogo = 240; // Largura máxima permitida em pixels
    private maxHeightLogo = 70; // Altura máxima permitida em pixels
    
    private maxSizeIcon = 1 * 1024 * 1024; // Tamanho máximo da imagem em bytes (1 MB)
    private maxWidthIcon = 64; // Largura máxima permitida em pixels
    private maxHeightIcon = 64; // Altura máxima permitida em pixels

    constructor() {      
    }
    
    //Limpar Mensagens De Erro
    private clearErrorAfterTimeout = (setError: (error: string | null) => void ,timeout: number = 5000 ) => {
        setTimeout(() => {
            setError(null)
        }, timeout); // 5000 milissegundos = 5 segundos
    };

    
    // Função para abrir o seletor de arquivos e carregar a imagem
    public CarregarImagens = (
      IsLogo: boolean,
      setExtImage:(extImage: string | null ) => void,
      setImage: (image: string | null) => void,
      setError: (error: string | null) => void

    ) => {
      if(IsLogo){
          setError(null);
      }else{
          setError(null);
      }
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      if(IsLogo){
        fileInput.accept = '.svg, .png';
      }else{
        fileInput.accept = '.ico';
      }
      fileInput.style.display = 'none';

      fileInput.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
              const image = new Image();
              image.src = e.target.result as string;

              if(IsLogo){
                
                if (file.size > this.maxSizeLogo) {
                  setError('O tamanho do arquivo deve ser menor que 1 MB.');
                  this.clearErrorAfterTimeout(setError);
                  return;
                }

                image.onload = () => {
                  if (image.width > this.maxWidthLogo || image.height > this.maxHeightLogo) {
                      setError(`A Logo deve ter no máximo>\n${this.maxWidthLogo}px de largura e\n${this.maxHeightLogo}px de altura.`);
                      this.clearErrorAfterTimeout(setError);
                    return;
                  }
                  else{
                    if(e.target == null){
                      setError(`Ocorreu um Problema ao carregar a imagem!`);
                      this.clearErrorAfterTimeout(setError);
                      return;
                    }
                    const fileName = file.name;
                    setExtImage(fileName.split('.').pop()?.toLowerCase() as string);
                    setImage(e.target.result as string);
                  }
                }


              }else{

                if (file.size > this.maxSizeIcon) {
                  setError('O tamanho do arquivo deve ser menor que 1 MB.');
                  this.clearErrorAfterTimeout(setError);
                  return;
                }

                image.onload = () => {
                  if (image.width > this.maxWidthIcon || image.height > this.maxHeightIcon) {
                      setError(`O Icone deve ter no máximo:\r${this.maxWidthIcon}px de largura e\r${this.maxHeightIcon}px de altura.`);
                    this.clearErrorAfterTimeout(setError);
                    return;
                  }
                  else{
                    if(e.target == null){
                      setError(`Ocorreu um Problema ao carregar a imagem!`);
                      this.clearErrorAfterTimeout(setError);
                      return;
                    }
                    const fileName = file.name;
                    setExtImage(fileName.split('.').pop()?.toLowerCase() as string);
                    setImage(e.target.result as string);
                  }
                }


              }

            }
          };
          reader.readAsDataURL(file);
        }
      };

      document.body.appendChild(fileInput);
      fileInput.click();
      document.body.removeChild(fileInput);
    };

    public RemoverImagens = (setImage: (image: string | null) => void, setExtImage: (ExtImage: string | null) => void) => {
      setImage(null);
      setExtImage(null);
    };

    formatDate = (isoString: string) => {
      return new Date(isoString).toISOString().split('T')[0];
    };

    public async GetInformacoesDaEmpresa (setObject: (parObj: TBEMPRESAS) => void){
      try {
        const response = await API.api.get('/GetInfoEmpresa', {}); 

        if(response.data){
          this.ObjTBEMPRESA = new TBEMPRESAS();
          Object.assign(this.ObjTBEMPRESA, response.data.data[0]);

          this.ObjTBEMPRESA.CNPJ = (Comum.formatCnpj(this.ObjTBEMPRESA.CNPJ));
          this.ObjTBEMPRESA.INSCRICAOESTADUAL = (Comum.formatIe(this.ObjTBEMPRESA.INSCRICAOESTADUAL));
          this.ObjTBEMPRESA.CELULAR = (Comum.formatCelular(this.ObjTBEMPRESA.CELULAR));
          this.ObjTBEMPRESA.TELEFONE = (Comum.formatTelefone(this.ObjTBEMPRESA.TELEFONE));
          this.ObjTBEMPRESA.CPFRESPONSAVEL = (Comum.formatCpf(this.ObjTBEMPRESA.CPFRESPONSAVEL));

          this.ObjTBEMPRESA.DATAABERTURA =  this.formatDate(this.ObjTBEMPRESA.DATAABERTURA);


          setObject(this.ObjTBEMPRESA);
        }else
        {
          console.error('Erro ao buscar informações da empresa');
        }
      } catch (error) {
        console.error('Erro ao buscar informações da empresa:', error);
      }
    }


  SetObjectSave(
    parObjEmpresa: TBEMPRESAS,
    parEXTENSAO_LOGO_236X67: string | null ,
    parLOGO_236X67: string | null ,
    parEXTENSAO_ICONE: string | null, 
    parICONE: string | null, ) 
  {
  
    if(this.ObjTBEMPRESA == null)
    {
      this.ObjTBEMPRESA = new TBEMPRESAS();
    }
    else{
      Object.assign(this.ObjTBEMPRESA, parObjEmpresa)
    }

    this.ObjTBEMPRESA.EXTENSAO_LOGO_236X67 =parEXTENSAO_LOGO_236X67 ?? "" ;
    this.ObjTBEMPRESA.LOGO_236X67 = btoa(unescape(encodeURIComponent(parLOGO_236X67 ?? ""))) ?? "" ;
    this.ObjTBEMPRESA.EXTENSAO_ICONE = parEXTENSAO_ICONE ?? "";
    this.ObjTBEMPRESA.ICONE = btoa(unescape(encodeURIComponent(parICONE ?? ""))) ?? "";
    
  }

  public async Salvar(){
    try {

      const response = await API.api.post('/SalvarInfoEmpresas', {parObjTBEMPRESA: btoa(unescape(encodeURIComponent(JSON.stringify(this.ObjTBEMPRESA, null, 2)))) ?? ""}); 

      return response.data.ID > 0;

    }catch(error) {
      console.error('Erro ao Salvar as informações da empresa:', error);
    }
  }
}