import { Link } from 'react-router-dom';
import { useState } from 'react';

const Nav = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav>
      <div className='dropdown'>
        <button onClick={toggleMenu}>Crear Proyecto/Reto</button>
        {openMenu && (
        <div>
        <a href="#">Nuevo</a>
        <a href="#">Existente</a>
        </div>
         )}
      </div>
      <Link to="/actualstate"></Link>
      <Link to="/">Inicio</Link>
      <Link to="">Tablero-Principal</Link>
    </nav>
  );
};

export default Nav;