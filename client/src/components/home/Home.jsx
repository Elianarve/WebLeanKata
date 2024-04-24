import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRetos } from '../../services/service'; 
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 20px;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const RetoCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Home = () => {
  const [retos, setRetos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRetos = async () => {
      try {
        const retosData = await getRetos(); // Llama al método getRetos para obtener todos los retos
        setRetos(retosData); // Actualiza el estado con los retos obtenidos
      } catch (error) {
        console.error('Error fetching retos:', error);
      }
    };

    fetchRetos();
  }, []);

  
  return (
    <HomeContainer>
      <h2>Retos</h2>
      <Gallery>
        {retos.map((reto) => (
          <RetoCard key={reto.id} onClick={() => navigate(`/card/${reto.id}`)}>
            <h3>{reto.name}</h3>
            <p>{reto.descripcion}</p>
            <p>Estado: {reto.estado}</p>
          </RetoCard>
        ))}
      </Gallery>
    </HomeContainer>
  );
};

export default Home;