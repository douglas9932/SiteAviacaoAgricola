import API from "../../Classes/API";
import { TBPRODUTOS } from "../../Classes/Tabelas/TBPRODUTOS";

export class FrmDetalharProdutoController{
    
    public IDPRODUTO: number = 0;
    public ObjProduto: TBPRODUTOS = new TBPRODUTOS;

    public async GetProduto (){
      try {
        const response = await API.api.post('/GetProdutoByID', {
            parID: this.IDPRODUTO
        }); 
  
        if(response.data){        
  
          Object.assign(this.ObjProduto, response.data.data[0]);
          
        }else
        {
          console.error('Erro ao buscar Contatos ');
        }
      } catch (error) {
        console.error('Erro ao buscar Contatos:', error);
      }
    }

    
}