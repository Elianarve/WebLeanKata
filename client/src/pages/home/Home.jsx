import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenge } from '../../services/challengeServices'; 
import '../../pages/home/Home.css';
import SearchBar from '../../components/searchBar/SearchBar';
import update from '../../assets/img/Edit-File.svg';
import {getActualState} from '../../services/actualStateServices';

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]); 
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const [challengesData, actualStatesData] = await Promise.all([getChallenge(), getActualState()]);
        const challengesWithData = challengesData.map(challenge => ({
          ...challenge,
          actual_state: actualStatesData.find(actualState => actualState.id === challenge.actual_state_id)?.description || 'Descripción no encontrada'
        }));
        setChallenges(challengesWithData); 
        setFilteredChallenges(challengesWithData); 
      } catch (error) {
        console.error('Error fetching retos:', error);
        setError('No se pudieron cargar los desafíos. Por favor, inténtalo de nuevo más tarde.');
      }
    };

    fetchChallenges();
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredResults = challenges.filter((challenge) => {
      return Object.values(challenge).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredChallenges(filteredResults); 
  };

  return (
    <div className="home-container">
    <SearchBar onSearch={handleSearch} />
      <h3>RETOS</h3>
      <div className="gallery-items">
        <div className="challenge-container">
          <div className="challenge-table">
            <div className="table-row">
              <div className="table-cell-title">ID del Reto</div>
              <div className="table-cell-title">Nombre del Reto</div>
              <div className="table-cell-title">Estado actual</div>
              <div className="table-cell-title">Acciones</div>
            </div>
              {filteredChallenges.map((challenge) => (
              <div key={challenge.id} className="table-row challenge-description" onClick={() => navigate(`/card/${challenge.id}`)}>
                <div className="table-cell">{challenge.id}</div>
                <div className="table-cell">{challenge.name}</div>
                <div className="table-cell">{challenge.actual_state}</div>
                <div className='logos'>
                <img className='logo-update' src={update} alt="" />
              </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
  );
};

export default Home;