import RegisterForm from '../components/forms/RegisterForm';
import arrow from '../assets/img/Arrow.svg'; 
import { Link } from 'react-router-dom';

const Register = () => { 
 return (
  React.createElement(React.Fragment, null, 
    React.createElement("div", { className: "flex items-center justify-center min-h-screen bg-neutral-900" }, 
      React.createElement("div", { className: "text-center" }, 
        React.createElement(Link, { to: "/" }, 
          React.createElement("img", { className: "ml-8 mt-3 absolute", src: arrow })
        ), 
        React.createElement("h1", { className: "font-poppins font-medium text-4xl text-white text-left ml-16" }, "Regístrate"), 
        React.createElement(RegisterForm, null)
      )
    )
  )
 );
}

export default Register;