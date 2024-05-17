import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./Nav.css";
import logo from "../../assets/img/logotipo2.png";

const Nav = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="navbar">
      <div className="logo-name">
        <img className='logo-img' src={logo} alt="logo" />
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`bar ${openMenu ? 'active' : ''}`}></div>
        <div className={`bar ${openMenu ? 'active' : ''}`}></div>
        <div className={`bar ${openMenu ? 'active' : ''}`}></div>
      </div>
      <ul className={`nav-links ${openMenu ? 'open' : ''}`}>
        <li className="nav-button"><Link to="/" onClick={toggleMenu}>Lean <span className='letter-nav'>K</span>ata</Link></li>
        {/* <li className="nav-button"><Link to="/" onClick={toggleMenu}>Inicio</Link></li> */}
        <li className="nav-button"><Link to="/process" onClick={toggleMenu}>Crear Reto</Link></li>
        <li className="nav-button"><Link to="/" onClick={toggleMenu}>Ver Existente</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
