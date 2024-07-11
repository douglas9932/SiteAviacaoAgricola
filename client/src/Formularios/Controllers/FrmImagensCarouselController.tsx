import API from "../../Classes/API";
import { TBIMAGENSCAROUSEL } from "../../Classes/Tabelas/TBIMAGENSCAROUSEL";

export class FrmImagensCarouselController{

  public ObjTBIMAGENSCAROUSEL: TBIMAGENSCAROUSEL[] =  [];

    public async GetImagensCarousel (setObject: (parTBIMAGENSCAROUSEL: TBIMAGENSCAROUSEL[]) => void){
        try {
          const response = await API.api.get('/GetImagensCarousel', {}); 
  
          if(response.data){        

            Object.assign(this.ObjTBIMAGENSCAROUSEL, response.data.data);
            
          }else
          {
            console.error('Erro ao buscar Imagens ');
          }
        } catch (error) {
          console.error('Erro ao buscar Imagens:', error);
        }
      }

    
}