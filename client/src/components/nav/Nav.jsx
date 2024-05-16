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
        <a className='a-link'><Link to="home/process">Nuevo</Link></a>
        <hr className='line' />
        <a className='a-link'><Link to="/card/:id">Existente</Link></a>
        </div>
          )}
        <div>
        <a className="a-link"><Link to="home/process">Inicio</Link></a>
        </div>
       
      </ul>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {openMenu && (
        <div className='nav-display'>
          <a className='a-link'><Link to="home/process">Nuevo</Link></a>
          <a className='a-link'><Link to="/card/:id">Existente</Link></a>
         
        </div>
      )}
    </nav>
  );
};

export default Nav;