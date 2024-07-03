import React, { useEffect, useState } from 'react';
import './FrmLogin.css'; // Assumindo que você vai criar um arquivo CSS para estilização
import logo from '../../Imagens/LogoStoll.png'
import { GetUsuarios } from '../../Controllers/Servicos/LoginController';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidLoginMessage, setInvalidLoginMessage] = useState('');
  const [data, setData] = useState<any[]>([]);

  
  const handleLogin = () => {
    setErrorMessage('');
    setInvalidLoginMessage('');

    if (!username || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (username !== 'usuario' || password !== 'senha') {
      setInvalidLoginMessage('Login ou senha inválidos.');
      return;
    }

    alert('Login realizado com sucesso!');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetUsuarios();
        setData(result);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);
  
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