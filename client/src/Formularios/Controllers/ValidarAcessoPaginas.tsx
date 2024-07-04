import { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Ambiente from '../../Classes/Ambiente';


const ValidarAcessoPaginas = (WrappedComponent: ComponentType) => {
  const AuthHOC = (props: any) => {
    const navigate = useNavigate();
    const ambiente = Ambiente.getInstance();

    useEffect(() => {
      if (!ambiente.UsuarioLogado) {
        navigate('/login');
      }
    }, [ambiente.UsuarioLogado, navigate]);

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default ValidarAcessoPaginas;
