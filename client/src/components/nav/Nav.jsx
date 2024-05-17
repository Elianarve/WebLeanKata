// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import "./Nav.css";
// import logo from "../../assets/img/logotipo2.png";

// const Nav = () => {
//   const [openMenu, setOpenMenu] = useState(false);
//   const toggleMenu = () => {
//     setOpenMenu(!openMenu);
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo-name">
//         <img className='logo-img' src={logo} alt="logo" />
//       </div>
//       <div className="menu-icon" onClick={toggleMenu}>
//         <div className={`hamburger ${openMenu ? 'active' : ''}`}></div>
//       </div>
//       <ul className={`nav-links ${openMenu ? 'open' : ''}`}>
//         <li className="nav-button"><Link to="/">Inicio</Link></li>

//         {openMenu && (
//         <div className='nav-display'>
//         <Link className='title-li-nav' to="/process">Nuevo</Link>
//         <hr className='line' />
//         <Link className='title-li-nav' to="/card/:id">Existente</Link>
//         </div>
//          )}
//         <li className="nav-button" onClick={toggleMenu} >Proyecto / Reto</li>
//       </ul>
//       <div className="menu-toggle" onClick={toggleMenu}>
//         <div className="bar"></div>
//         <div className="bar"></div>
//         <div className="bar"></div>
//       </div>
//       {openMenu && (
//         <div className='nav-display-toggle'>
//         <Link to="/process">Nuevo</Link>
//         <Link to="/card/:id">Existente</Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Nav;


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
        <li className="nav-button"><Link to="/" onClick={toggleMenu}>Lean<span>K</span>ata</Link></li>
        <li className="nav-button"><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
        <li className="nav-button"><Link to="/process" onClick={toggleMenu}>Crear Reto</Link></li>
        <li className="nav-button"><Link to="/card/:id" onClick={toggleMenu}>Ver Existente</Link></li>
        {/* <li className="nav-button" onClick={toggleMenu}>Proyecto / Reto</li> */}
      </ul>
    </nav>
  );
};

export default Nav;
