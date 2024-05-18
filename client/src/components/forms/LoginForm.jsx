import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { loginUser } from '../../services/logReg';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import "./css/Forms.css"

const LoginForm = () => {
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
      <div className="form-center">
        <form onSubmit={handleSubmit} className="form-create">
          <h2>Iniciar Sesión</h2>
          <div className="mb-4">
            <label className="block text-white font-poppins mb-2 text-left" htmlFor="email">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                required
                className="font-poppins shadow appearance-none bg-[#222222] rounded-lg text-slate-50 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-12"
                id="email"
                placeholder="hola.soy.bea@gmail.com"
              />
              {emailError && <p className="text-[#FB005A] text-xs mt-2">{emailError}</p>}
            </label>
          </div>
          <div className="mb-6">
            <label className="font-poppins block text-white mb-2 text-left" htmlFor="password">
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                required
                className="font-poppins shadow appearance-none bg-[#222222] rounded-lg text-slate-50 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-12"
                id="password"
                placeholder="Ingresa tu contraseña"
              />
              {passwordError && <p className="text-[#FB005A] text-xs">{passwordError}</p>}
            </label>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="w-full font-poppins bg-gradient-to-r rounded-lg from-[#B800B0] to-[#FB005A] hover:from- [#FB005A] hover:to-[#B800B0] text-white py-2 px-4 focus:outline-none focus:shadow-outline mb-5 h-12"
              type="submit"
            >
              Iniciar sesión
            </button>
            <p className="font-poppins text-[#9E9E9E] justify-center">¿No tienes cuenta? <Link to="/register" className="text-white">Regístrate</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;