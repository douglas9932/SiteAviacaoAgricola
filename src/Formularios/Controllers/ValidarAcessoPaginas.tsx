import { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Ambiente from '../../Classes/Ambiente';
import { jwtDecode } from 'jwt-decode';

const ValidarAcessoPaginas = (WrappedComponent: ComponentType) => {
  const AuthHOC = (props: any) => {
    const navigate = useNavigate();
    const ambiente = Ambiente.getInstance();
    let decodedToken = undefined;
    let expirationTime = Date.now();
    let currentTime = Date.now();
    
    useEffect(() => {
        
      try {
         decodedToken = jwtDecode(ambiente.TokenUsuario);
         expirationTime = decodedToken.exp ? decodedToken.exp * 1000 : 0;     
      } catch 
      {
        console.log('Erro ao decodificar o token:');
        navigate('/login');
      }

      if (!ambiente.TokenUsuario) {
        navigate('/login');
      }

      if (currentTime > expirationTime) {
        navigate('/login');
      }

      if (!ambiente.UsuarioLogado) {
        navigate('/login');
      }
    }, [ambiente.UsuarioLogado, navigate]);
    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default ValidarAcessoPaginas;
