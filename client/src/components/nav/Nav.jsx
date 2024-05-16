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
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`hamburger ${openMenu ? 'active' : ''}`}></div>
      </div>
      <ul className={`nav-links ${openMenu ? 'open' : ''}`}>
        <li className="nav-button" onClick={toggleMenu} >Proyecto/Reto</li>
        <Link to="/process">Nuevo</Link> {/* Utiliza Link para ir a la ruta "/process" */}
        {openMenu && (
        <div className='nav-display'>
        <a className='a-link' href="home/process">Nuevo</a>
        <hr className='line' />
        <a className='a-link' href="/card/:id">Existente</a>
        </div>
         )}
        <li className="nav-button"><Link to="/">Inicio</Link></li>
      </ul>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {openMenu && (
        <div className='nav-display'>
          <a className='a-link' href="home/process">Nuevo</a>
          <a className='a-link' href="/card/:id">Existente</a>
         <Link to="home/process">Nuevo</Link>
         <Link to="/home/process">Hola</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
