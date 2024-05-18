import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {

  return (
    React.createElement(React.Fragment, null, 
      React.createElement("div", { className: "flex items-center justify-center min-h-screen bg-neutral-900" }, 
        React.createElement("div", { className: "text-center" }, 
          React.createElement(Link, { to: "/" }, 
          ),  
          React.createElement(LoginForm, null)
        )
      )
    )
   );
}

export default Login;