import API from "../../Classes/API";
import { TBNOTICIAS } from "../../Classes/Tabelas/TBNOTICIAS";

export class FrmNoticiasController{
    
    public ObjLstNoticias: TBNOTICIAS[] =  [];

    private clearErrorAfterTimeout = (setError: (error: string | null) => void ,timeout: number = 5000 ) => {
      setTimeout(() => {
          setError(null)
      }, timeout); // 5000 milissegundos = 5 segundos
    };
    
    public CarregarImagens = (
      IsLogo: boolean,
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
        fileInput.accept = '.svg, .png, .Jpeg, .Jpg';
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
                
                // if (file.size > this.maxSizeLogo) {
                //   setError('O tamanho do arquivo deve ser menor que 1 MB.');
                //   this.clearErrorAfterTimeout(setError);
                //   return;
                // }
  
                image.onload = () => {
                  // if (image.width > this.maxWidthLogo || image.height > this.maxHeightLogo) {
                  //     setError(`A Logo deve ter no máximo>\n${this.maxWidthLogo}px de largura e\n${this.maxHeightLogo}px de altura.`);
                  //     this.clearErrorAfterTimeout(setError);
                  //   return;
                  // }
                  // else{
                    if(e.target == null){
                      setError(`Ocorreu um Problema ao carregar a imagem!`);
                      this.clearErrorAfterTimeout(setError);
                      return;
                    }
                    const fileName = file.name;
                    setImage(e.target.result as string);
                  // }
                }
  
  
              }else{
  
                // if (file.size > this.maxSizeIcon) {
                //   setError('O tamanho do arquivo deve ser menor que 1 MB.');
                //   this.clearErrorAfterTimeout(setError);
                //   return;
                // }
  
                image.onload = () => {
                  // if (image.width > this.maxWidthIcon || image.height > this.maxHeightIcon) {
                  //     setError(`O Icone deve ter no máximo:\r${this.maxWidthIcon}px de largura e\r${this.maxHeightIcon}px de altura.`);
                  //   this.clearErrorAfterTimeout(setError);
                  //   return;
                  // }
                  // else{
                    if(e.target == null){
                      setError(`Ocorreu um Problema ao carregar a imagem!`);
                      this.clearErrorAfterTimeout(setError);
                      return;
                    }
                    const fileName = file.name;
                    setImage(e.target.result as string);
                  // }
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
  
    public RemoverImagens = (setImage: (image: string | null) => void) => {
      setImage(null);
    };   

    public async GetNoticias (){
      try {
        const response = await API.api.get('/GetNoticias', {}); 
  
        if(response.data){        
  
          Object.assign(this.ObjLstNoticias, response.data.data);
          
        }else
        {
          console.error('Erro ao buscar Noticias ');
        }
      } catch (error) {
        console.error('Erro ao buscar Noticias:', error);
      }
    }

    public async Salvar(parObjTBNOTICIAS?: TBNOTICIAS){
      try {
  
        if(!parObjTBNOTICIAS){
          return;
        }
  
        parObjTBNOTICIAS.IMAGEMCAPA = btoa(unescape(encodeURIComponent(parObjTBNOTICIAS?.IMAGEMCAPA ?? ""))) ?? "";
        
        const response = await API.api.post('/SalvarNoticia', {parObjTBNOTICIAS: btoa(unescape(encodeURIComponent(JSON.stringify(parObjTBNOTICIAS, null, 2)))) ?? ""}); 

        return response.data.ID > 0;
  
      }catch(error) {
        console.error('Erro ao Salvar as informações do Noticia:', error);
      }
    }

    public async DeletarNoticia(parID: number){
      try {
  
        if(!parID){
          return;
        }
  
        const response = await API.api.post('/DeletarNoticia', {
          parID: parID
        }); 
  
        return response.data.ID > 0;
  
      }catch(error) {
        console.error('Erro ao Deletar Noticia', error);
      }
    }
}