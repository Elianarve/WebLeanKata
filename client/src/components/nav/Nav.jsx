import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to="/actualstate">Crear Proyecto/Reto</Link>
      <Link to="/">Inicio</Link>
      <Link to="">Tablero-Principal</Link>
    </nav>
  );
};

export default Nav;