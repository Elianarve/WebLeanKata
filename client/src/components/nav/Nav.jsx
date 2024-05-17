import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./Nav.css";

const Nav = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        {/* <img src={logo} alt="logo" /> */}
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`hamburger ${openMenu ? 'active' : ''}`}></div>
      </div>
      <ul className={`nav-links ${openMenu ? 'open' : ''}`}>
        <li className="nav-button" onClick={toggleMenu}>Proyecto/Reto</li>
        <li className="nav-button">
          <Link to="/" onClick={toggleMenu}>Inicio</Link>
        </li>
      </ul>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {openMenu && (
        <div className='nav-display'>
          <Link className='a-link' to="home/process" onClick={toggleMenu}>Nuevo</Link>
          <hr className='line' />
          <Link className='a-link' to="/card/:id" onClick={toggleMenu}>Existente</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
