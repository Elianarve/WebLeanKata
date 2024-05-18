import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import arrow from '../assets/img/Arrow.svg'; 
import { Link } from 'react-router-dom';

const Login = () => {

  return (
    React.createElement(React.Fragment, null, 
      React.createElement("div", { className: "flex items-center justify-center min-h-screen bg-neutral-900" }, 
        React.createElement("div", { className: "text-center" }, 
          React.createElement(Link, { to: "/" }, 
            React.createElement("img", { className: "ml-8 mt-3 absolute", src: arrow })
          ), 
          React.createElement("h1", { className: "font-poppins font-medium text-4xl text-white mb-20 ml-16 text-left" }, "Iniciar sesión"), 
          React.createElement(LoginForm, null)
        )
      )
    )
   );
}

export default Login;