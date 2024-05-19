import RegisterForm from '../components/forms/RegisterForm';
import { Link } from 'react-router-dom';
import React from 'react';

const Register = () => { 
 return (
  React.createElement(React.Fragment, null, 
    React.createElement("div", { className: "flex items-center justify-center min-h-screen bg-neutral-900" }, 
      React.createElement("div", { className: "text-center" }, 
        React.createElement(Link, { to: "/" }, 
        ), 
        React.createElement(RegisterForm, null)
      )
    )
  )
 );
}

export default Register;