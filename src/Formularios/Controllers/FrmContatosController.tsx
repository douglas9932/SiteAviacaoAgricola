import API from "../../Classes/API";
import { TBCONTATOS } from "../../Classes/Tabelas/TBCONTATOS";

export class FrmContatosController{
    
    public ObjLstContatos: TBCONTATOS[] =  [];

    public async GetContatos (){
      try {
        const response = await API.api.get('/GetContatos', {}); 
  
        if(response.data){        
  
          Object.assign(this.ObjLstContatos, response.data.data);
          
        }else
        {
          console.error('Erro ao buscar Contatos ');
        }
      } catch (error) {
        console.error('Erro ao buscar Contatos:', error);
      }
    }

    public async Salvar(parObjTBCONTATOS?: TBCONTATOS){
      try {
  
        if(!parObjTBCONTATOS){
          return;
        }
  
        const response = await API.api.post('/SalvarContato', {parObjTBCONTATOS: btoa(unescape(encodeURIComponent(JSON.stringify(parObjTBCONTATOS, null, 2)))) ?? ""}); 
  
        return response.data.ID > 0;
  
      }catch(error) {
        console.error('Erro ao Salvar as informações do Contato:', error);
      }
    }

    public async DeletarContato(parID: number){
      try {
  
        if(!parID){
          return;
        }
  
        const response = await API.api.post('/DeletarContato', {
          parID: parID
        }); 
  
        return response.data.ID > 0;
  
      }catch(error) {
        console.error('Erro ao Deletar Contato', error);
      }
    }
}