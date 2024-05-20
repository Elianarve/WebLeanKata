import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { loginUser } from '../../services/logReg';
import '../../components/forms/css/RegForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { userAuth, setUserAuth } = useUserContext();
  const { user, setUser } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('authToken', data.token);
      setUser(data.data);
      setUserAuth(true);
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);

      if (error.message.includes('Usuario no registrado.')) {
        setEmailError('Usuario no registrado.');
        setPasswordError('');
      } else if (error.message.includes('Contraseña incorrecta.')) {
        setPasswordError('Contraseña incorreta.');
        setEmailError('');
      } else {
        setPasswordError('Error en la solicitud de inicio de sesión');
        setEmailError('');
      }
    }
  };

  return (
    <div className="form-container">
        <form onSubmit={handleSubmit} className="form-create-log">
          <h2>Iniciar Sesión</h2>
          <div className="items">
            <label className="label-item" htmlFor="email">Email</label>
              <input type="email" value={email} onChange={(e) => {setEmail(e.target.value),setEmailError('')}}
                required
                className="input-reg"
                id="email"
                placeholder="hola.soy.bea@gmail.com"/>
              {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="items">
            <label className="label-item" htmlFor="password">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                required
                className="input-reg"
                id="password"
                placeholder="Ingresa tu contraseña"
              />
              {passwordError && <p className="error-message">{passwordError}</p>}
          
          </div>
          <div className="items">
            <button className="button-forms-log" type="submit">Iniciar sesión</button>
           </div> 
           <div className='items-reg'>
            <p className="paragraph-reg">¿No tienes cuenta? <Link to="/register" className='button-reg'>Regístrate</Link></p>
          </div>
        </form>
      </div>
  );
}

export default Login;