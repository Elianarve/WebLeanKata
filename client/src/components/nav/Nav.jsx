import { Link } from 'react-router-dom'; 
import { useUserContext } from '../../context/UserContext'; 
import { useState } from 'react';
import "./Nav.css";
import logo from "../../assets/img/logotipo2.png";
import Logout from '../logOut/LogOut';

const Nav = () => {
   const { user, userAuth } = useUserContext(); 
  const [openMenu, setOpenMenu] = useState(false);


  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="navbar">
      <div className="logo-name">
        <img className='logo-img' src={logo} alt="logo" />
      </div>

      { userAuth && (
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`bar ${openMenu ? 'active' : ''}`}></div>
        <div className={`bar ${openMenu ? 'active' : ''}`}></div>
        <div className={`bar ${openMenu ? 'active' : ''}`}></div>
      </div>
      )}
      { userAuth && (
      <ul className={`nav-links ${openMenu ? 'open' : ''}`}>
        <li className="nav-button"><Link to="/home" onClick={toggleMenu}>Lean <span className='letter-nav'>K</span>ata</Link></li>
        <li className="nav-button"><Link to="process" onClick={toggleMenu}>Crear Reto</Link></li>
        <li className="nav-button"><Link to="home" onClick={toggleMenu}>Ver Existente</Link></li>
        <div className='button-profile'>
        <p className="nav-button-profile">{user && user.name}</p>&nbsp;
        <Logout/>
        </div>
      </ul>
      )}
    </nav>
  );
};

export default Nav;
