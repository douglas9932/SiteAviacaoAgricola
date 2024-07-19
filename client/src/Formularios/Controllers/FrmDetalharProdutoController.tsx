import API from "../../Classes/API";
import { TBPARTESPRODUTOS } from "../../Classes/Tabelas/TBPARTESPRODUTOS";
import { TBPRODUTOS } from "../../Classes/Tabelas/TBPRODUTOS";

export class FrmDetalharProdutoController{
    
    public IDPRODUTO: number = 0;
    public ObjProduto: TBPRODUTOS = new TBPRODUTOS;
    public ObjLstItens: TBPARTESPRODUTOS[] = [];

    public async GetProduto (){
      try {
        const response = await API.api.post('/GetProdutoByID', {
            parID: this.IDPRODUTO
        }); 
  
        if(response.data){        
  
          Object.assign(this.ObjProduto, response.data.data[0]);
          
          if(this.ObjProduto && this.ObjProduto.IDPRODUTO > 0){
            await this.GetPartes(this.ObjProduto.IDPRODUTO);
          }

        }else
        {
          console.error('Erro ao buscar Contatos ');
        }
      } catch (error) {
        console.error('Erro ao buscar Contatos:', error);
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
    
}