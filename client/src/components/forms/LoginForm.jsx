import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { loginUser } from '../../services/logReg';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); 
  const { userAuth, setUserAuth  } = useUserContext();
  const { user, setUser  } = useUserContext();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      Swal.fire("Bienvenid@ ${data.data.name} 👋");
      localStorage.setItem('authToken', data.token);
      setUser(data.data);
      setUserAuth(true);
      navigate('/home');
    } catch (error){
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
    React.createElement(React.Fragment, null, 
     React.createElement("form", { onSubmit: handleSubmit, className: "px-8 pb-8 mb-4" }, 
        React.createElement("div", { className: "mb-4" }, 
          React.createElement("label", { className: "block text-white font-poppins mb-2 text-left", htmlFor: "email" }, 
            "Email", 
            React.createElement("input", { type: "email", value: email, onChange: (e) => {
              setEmail(e.target.value);
              setEmailError('');}, required: true, className: "font-poppins shadow appearance-none bg-[#222222] rounded-lg text-slate-50 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-12", id: "email", placeholder: "hola.soy.bea@gmail.com" }), 
              emailError && React.createElement("p", { className: "text-[#FB005A] text-xs mt-2" }, emailError)
          )
        ), 

        React.createElement("div", { className: "mb-6" }, 
          React.createElement("label", { className: "font-poppins block text-white mb-2 text-left", htmlFor: "password" }, 
            "Contraseña", 
            React.createElement("input", { type: "password", value: password, onChange: (e) =>{
               setPassword(e.target.value);
               setPasswordError('');}, required: true, className: "font-poppins shadow appearance-none bg-[#222222] rounded-lg text-slate-50 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-12", id: "password", placeholder: "Ingresa tu contraseña" }), 
               passwordError && React.createElement("p", { className: "text-[#FB005A] text-xs" }, passwordError)
          )
        ), 
        React.createElement("div", { className: "flex flex-col items-center" }, 
            React.createElement("button", { className: "w-full font-poppins bg-gradient-to-r rounded-lg from-[#B800B0] to-[#FB005A] hover:from- [#FB005A] hover:to-[#B800B0] text-white py-2 px-4 focus:outline-none focus:shadow-outline mb-5 h-12", type: "submit" }, 
            "Iniciar sesión"
            ), 
            React.createElement("p", { className: "font-poppins text-[#9E9E9E] justify-center" }, "¿No tienes cuenta? ", React.createElement(Link, { to: "/register", className: "text-white" }, "Regístrate"))
        )
      )
    )
 );
}

export default LoginForm;