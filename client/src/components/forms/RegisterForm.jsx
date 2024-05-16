import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useId } from 'react';
import { useUserContext } from '../../context/UserContext';
import { registerUser } from '../../services/logReg';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import "../forms/css/Forms.css"

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const termsId = useId();
  const { setUserAuth, setUser } = useUserContext();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido.').min(2, 'El nombre debe tener al menos dos caracteres.'),
    email: Yup.string().email('El email debe ser válido.').required('El email es requerido.'),
    password: Yup.string().required('La contraseña es requerida').min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
,
        'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un caracter especial (!@#$%^&*(),.?":{}|<>) y debe tener al menos 8 caracteres.'
      ),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ name, email, password }, { abortEarly: false });
      const data = await registerUser(name, email, password);
      Swal.fire(`Usuario registrado correctamente, bienvenid@ ${data.data.name} 👋`);
      localStorage.setItem('authToken', data.token);
      setUser(data.data);
      setUserAuth(true);
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);

      error.inner.forEach((err) => {
        if (err.path === 'name') {
          setNameError(err.message);
        } else if (err.path === 'email') {
          setEmailError(err.message);
        } else if (err.path === 'password') {
          setPasswordError(err.message)
        }
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-center">
        <form onSubmit={handleSubmit} className="form-create">
          <div className="">
            <label className="block text-white font-poppins mb-2 text-left" htmlFor="name">
              Nombre
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError('');
                }}
                required
                className="font-poppins shadow appearance-none rounded-lg w-full bg-[#222222] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-12"
                id="name"
                placeholder="Escribe tu nombre completo"
              />
              {nameError && <p className="text-[#FB005A] text-xs">{nameError}</p>}
            </label>
          </div>
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
                className="font-poppins shadow appearance-none rounded-lg w-full bg-[#222222] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-12"
                id="email"
                placeholder="hola@gmail.com"
              />
              {emailError && <p className="text-[#FB005A] text-xs">{emailError}</p>}
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
              {passwordError && <p className="text-[#FB005A] w-80 text-xs">{passwordError}</p>}
            </label>
          </div>
          <div className="terms-container">
            <input
              className="accent-[#FB005A]"
              type="checkbox" id={termsId} name="terms" required
            />
            <label className="font-poppins text-white text-sm ml-2 " htmlFor={termsId}>
              <span className="text-neutral-400">He leído y acepto</span> los términos y condiciones
            </label>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="w-full font-poppins bg-gradient-to-r rounded-lg from-[#B800B0] to-[#FB005A] hover:from-[#FB005A] hover:to-[#B800B0] text-white py-2 px-4 mt-4 focus:outline-none focus:shadow-outline mb-5 h-12"
              type="submit"
            >
              Crea tu cuenta
            </button>
            <p className="font-poppins text-[#9E9E9E] justify-center">¿Ya tienes cuenta? <Link to="/login" className="text-white">Inicia sesión</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;