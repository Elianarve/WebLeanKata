import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login'); // Redirige al usuario al login si no está autenticado
    return null;
  }

  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>
      {/* Otro contenido de la página de inicio */}
    </div>
  );
};

export default Home;

