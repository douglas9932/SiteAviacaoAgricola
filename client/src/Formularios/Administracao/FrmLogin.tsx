import  { useState } from 'react';
import './Css/FrmLogin.css'; 
import logo from '../../Imagens/LogoStoll.png'
import LoginController from '../../Controllers/Servicos/LoginController'
import { useNavigate } from 'react-router-dom';

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
  
  return (
    <div className="login-background">
      <div className="blur-overlay">
      <div className="login-container">
        <img src={logo} alt="Logo" className="logo" /> 
        <h2>Login</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errorMessage && !username && (
            <p className="error-message">O campo de nome de usuário é obrigatório.</p>
          )}
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && !password && (
            <p className="error-message">O campo de senha é obrigatório.</p>
          )}
        </div>
        <button onClick={handleLogin}>Entrar</button>
        {invalidLoginMessage && (
          <p className="error-message">{invalidLoginMessage}</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default Login;