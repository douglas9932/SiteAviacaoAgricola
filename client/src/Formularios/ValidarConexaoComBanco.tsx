import { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginController from '../Controllers/Servicos/LoginController';
import Swal from 'sweetalert2';
import { Mensagens } from '../Classes/Mensagens';


const ValidarConexaoComBanco = (WrappedComponent: ComponentType) => {
  const AuthHOC = (props: any) => {
    const navigate = useNavigate();
    
    useEffect(() => {
         
      const minhaFuncao = async () => {
          
        if(! await LoginController.VerificarConexao()){
          Swal.fire({
            text: Mensagens.ConexaoOffline(),
            icon: "error",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            } else if (result.isDenied) {
              
            }
          });    
        }
      }
    
    }, []);
    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default ValidarConexaoComBanco;
