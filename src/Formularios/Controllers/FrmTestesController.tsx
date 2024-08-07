import API from "../../Classes/API";
import { TBTESTES } from "../../Classes/Tabelas/TBTESTES";

export class FrmTestesController{
    
    public ObjLstTestes: TBTESTES[] =  [];

    public async GetTestes (){
      try {
        const response = await API.api.get('/GetTestes', {}); 
  
        if(response.data){        
  
          Object.assign(this.ObjLstTestes, response.data.data);
          
        }else
        {
          console.error('Erro ao buscar Testes ');
        }
      } catch (error) {
        console.error('Erro ao buscar Testes:', error);
      }
    }

    public async Salvar(parObjTBTESTES?: TBTESTES){
      try {
  
        if(!parObjTBTESTES){
          return;
        }
  
        const response = await API.api.post('/SalvarTeste', {parObjTBTESTES: btoa(unescape(encodeURIComponent(JSON.stringify(parObjTBTESTES, null, 2)))) ?? ""}); 

        return response.data.ID > 0;
  
      }catch(error) {
        console.error('Erro ao Salvar as informações do Teste:', error);
      }
    }

    public async DeletarTeste(parID: number){
      try {
  
        if(!parID){
          return;
        }
  
        const response = await API.api.post('/DeletarTeste', {
          parID: parID
        }); 
  
        return response.data.ID > 0;
  
      }catch(error) {
        console.error('Erro ao Deletar Teste', error);
      }
    }
}