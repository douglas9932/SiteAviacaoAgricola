import API from "../../Classes/API";
import { TBPARTESPRODUTOS } from "../../Classes/Tabelas/TBPARTESPRODUTOS";
import { TBPRODUTOS } from "../../Classes/Tabelas/TBPRODUTOS";

export class FrmProdutosController{
    
    public ObjLstProdutos: TBPRODUTOS[] =  [];
    public ObjLstItens: TBPARTESPRODUTOS[] = [];

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
                    //const fileName = file.name;
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
                    //const fileName = file.name;
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


    public async GetProdutos (){
      try {
        const response = await API.api.get('/GetProdutos', {}); 
  
        if(response.data){        
  
          Object.assign(this.ObjLstProdutos, response.data.data);
          
        }else
        {
          console.error('Erro ao buscar Produtos ');
        }
      } catch (error) {
        console.error('Erro ao buscar Produtos:', error);
      }
    }

    public async GetPartes (parID:number){
      try {
        this.ObjLstItens = [];
        const responseItens = await API.api.post('/GetPartesProduto', {
          parIDPRODUTO: parID
        }); 

        if(responseItens.data){        

          Object.assign(this.ObjLstItens, responseItens.data.data);
          
        }else
        {
          console.error('Erro ao buscar Itens ');
        } 
      } catch (error) {
        console.error('Erro ao buscar Produtos:', error);
      }
    }

    public async Salvar(parObjTBPRODUTOS?: TBPRODUTOS, SetIDPRODUTOInserido?: (parID: number) => void){
      try {
  
        if(!parObjTBPRODUTOS){
          return;
        }
  
        parObjTBPRODUTOS.IMAGEMCAPA = btoa(unescape(encodeURIComponent(parObjTBPRODUTOS?.IMAGEMCAPA ?? ""))) ?? "";
        parObjTBPRODUTOS.IMAGEMPRODUTOEXPANDIDO = btoa(unescape(encodeURIComponent(parObjTBPRODUTOS?.IMAGEMPRODUTOEXPANDIDO ?? ""))) ?? "";

        const response = await API.api.post('/SalvarProduto', {parObjTBPRODUTOS: btoa(unescape(encodeURIComponent(JSON.stringify(parObjTBPRODUTOS, null, 2)))) ?? ""}); 

        if(SetIDPRODUTOInserido){
          SetIDPRODUTOInserido(response.data.ID);
          parObjTBPRODUTOS.IDPRODUTO = response.data.ID;
        }

        return response.data.ID > 0;
  
      }catch(error) {
        console.error('Erro ao Salvar as informações do Produto:', error);
      }
    }

    public async DeletarProduto(parID: number){
      try {
  
        if(!parID){
          return;
        }
  
        const response = await API.api.post('/DeletarProduto', {
          parID: parID
        }); 
  
        return response.data.ID > 0;
  
      }catch(error) {
        console.error('Erro ao Deletar Produto', error);
      }
    }

    public async SalvarParteProduto(parObjTBPARTESPRODUTOS?: TBPARTESPRODUTOS | null){
      try {
  
        if(!parObjTBPARTESPRODUTOS){
          return;
        }
  
        const response = await API.api.post('/SalvarPartesProduto', {parObjTBPARTESPRODUTOS: btoa(unescape(encodeURIComponent(JSON.stringify(parObjTBPARTESPRODUTOS, null, 2)))) ?? ""}); 
  
        return response.data.ID > 0;
  
      }catch(error) {
        console.error('Erro ao Salvar as informações do Produto:', error);
      }
    }

    public async DeletarParteProduto(parID: number){
      try {
  
        if(!parID){
          return;
        }
  
        const response = await API.api.post('/DeletarParteProduto', {
          parID: parID
        }); 
  
        return response.data.ID > 0;
  
      }catch(error) {
        console.error('Erro ao Deletar Produto', error);
      }
    }
}