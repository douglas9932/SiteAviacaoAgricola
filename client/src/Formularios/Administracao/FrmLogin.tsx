import  { useEffect, useState } from 'react';
import styles from './Css/FrmLogin.module.css'; 
import logo from '../../Imagens/LogoStoll.png'
import LoginController from '../../Controllers/Servicos/LoginController'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Mensagens } from '../../Classes/Mensagens';
import ValidarConexaoComBanco from '../ValidarConexaoComBanco';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidLoginMessage, setInvalidLoginMessage] = useState('');
  
  const handleLogin = async () => {
    setErrorMessage('');
    setInvalidLoginMessage('');

    if (!username || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (!await LoginController.ValidarLogin(username, password)) {
      setInvalidLoginMessage('Login ou senha inválidos.');
      return;
    }
    else{
      //LOGOU COM SUCESSO
      navigate('/Administracao/Home');
    }
  };
  
  useEffect(() => {
    
    const minhaFuncao = async () => {

      // if(! await LoginController.VerificarConexao()){
      //   Swal.fire({
      //     text: Mensagens.ConexaoOffline(),
      //     icon: "error",
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       window.location.reload();
      //     } else if (result.isDenied) {
            
      //     }
      //   });
        

      // }
    }
      minhaFuncao();

  }, []);
  
  return (
    <div className={styles.login_background}>
      <div className={styles.blur_overlay}>
      <div className={styles.login_container}>
        <img src={logo} alt="Logo" className={styles.logo} /> 
        <h2>Login</h2>
        <div className={styles.input_container}>
          <input
            type="text"
            placeholder="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errorMessage && !username && (
            <p className={styles.error_message}>O campo de nome de usuário é obrigatório.</p>
          )}
        </div>
        <div className={styles.input_container}>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && !password && (
            <p className={styles.error_message}>O campo de senha é obrigatório.</p>
          )}
        </div>
        <button onClick={handleLogin}>Entrar</button>
        {invalidLoginMessage && (
          <p className={styles.error_message}>{invalidLoginMessage}</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default ValidarConexaoComBanco(Login);