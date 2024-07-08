import { Component } from 'react';
import Ambiente from '../../Classes/Ambiente';
import API from '../../Classes/API';


class LoginController extends Component{
    
  
    static ValidarLogin = async (parLogin: any, parSenha: any) => {
      try {

        const response = await API.api.post('/ValidarLogin', {          
            parLogin: parLogin,
            parSenha: parSenha          
        });      


        if(response.data.valid){

          Ambiente.getInstance().TokenUsuario = response.data.userToken;
        }
        
        Ambiente.getInstance().UsuarioLogado = response.data.valid;
        return response.data.valid;

      } catch (error) {
        console.error('Error fetching data', error);
        throw error;
      }
   };

   static FazerLogout(navigate: (path: string) => void){
      Ambiente.getInstance().TokenUsuario = "";
      Ambiente.getInstance().UsuarioLogado= false;
      navigate('/login');
   }
}

export default LoginController;