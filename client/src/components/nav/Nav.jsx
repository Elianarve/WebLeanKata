import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../nav/Nav.css';
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
        <li className="nav-button" onClick={toggleMenu} >Proyecto/Reto</li>
        {openMenu && (
        <div className='nav-display'>
        <a className='a-link' href="/actualstate">Nuevo</a>
        <hr className='line' />
        <a className='a-link' href="/card/:id">Existente</a>
        </div>
         )}
        <li className="nav-button"><Link to="/">Inicio</Link></li>
        <li className="nav-button"><Link to="/detail/:id">Tablero Principal</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;