import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./Nav.css";
import logo from '../../assets/img/logo-lk.png';

const Nav = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <ul className='nav-links'>
        <li className="nav-button" onClick={toggleMenu}>Proyecto/Reto</li>
        <li className="nav-button"><Link to="/">Inicio</Link></li>
        <li className="nav-button"><Link to="/Edit/:id">Tablero Principal</Link></li>
      </ul>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {openMenu && (
        <div className='nav-display'>
          <a className='a-link' href="/process">Nuevo</a>
          <a className='a-link' href="/card/:id">Existente</a>
        </div>
        
      )}
    </nav>
  );
};

export default Nav;