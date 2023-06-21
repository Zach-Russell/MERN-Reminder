import React, { useContext, useState } from 'react';
import loginRequest from '../api/loginRequest';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../App';


export const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useContext(TokenContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    loginRequest(password)
      .then(({ token }) => {
        setToken(token);
        navigate('/');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <h1 style={{
              fontSize: "5rem",
            }}
      >Login</h1>
      <h2>
        Enter Password:
      </h2>
      <div style={{ color: 'red' }}>{error}</div>
      <form onSubmit={handleLogin} className='login__form'>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            fontSize: "2rem",
          }}
        />
        <button className='login__btn'
        style={{
          fontSize: "2rem",
        }}>Submit</button>
      </form>
    </div>
  );
};