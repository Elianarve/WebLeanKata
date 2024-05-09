import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenge } from '../../services/challengeServices'; 
import '../../pages/home/Home.css';
import SearchBar from '../../components/searchBar/SearchBar';

const Home = () => {
  const [challenges, setChallenges] = useState([]);
<<<<<<< HEAD
  const [error, setError] = useState(null);
=======
  const [filteredChallenges, setFilteredChallenges] = useState([]); // Estado para almacenar los desafíos filtrados
>>>>>>> develop
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesData = await getChallenge();
        setChallenges(challengesData); 
        setFilteredChallenges(challengesData); // Inicialmente, establece los desafíos filtrados como todos los desafíos
      } catch (error) {
        console.error('Error fetching retos:', error);
        setError('No se pudieron cargar los desafíos. Por favor, inténtalo de nuevo más tarde.');
      }
    };

    fetchChallenges();
  }, []);

<<<<<<< HEAD
  return (
    <div className="home-container">
      <h2>Retos</h2>
      <div className="gallery-items">
        {error && <p className="error-message">{error}</p>}
        <div className="challenge-container">
          <div className="challenge-table">
            <div className="table-row">
              <div className="table-cell-title">ID del desafío</div>
              <div className="table-cell-title">Nombre del desafío</div>
              <div className="table-cell-title">ID del estado actual del desafío</div>
            </div>
            {challenges.map((challenge) => (
              <div key={challenge.id} className="table-row challenge-description" onClick={() => navigate(`/card/${challenge.id}`)}>
                <div className="table-cell">{challenge.id}</div>
                <div className="table-cell">{challenge.name}</div>
                <div className="table-cell">{challenge.actual_state_id}</div>
              </div>
            ))}
          </div>
        </div>
=======
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
      <h2>Retos</h2>
      <div className="gallery-items">
        <div className="challenge-container">
          <div className="challenge-table">
            <div className="table-row">
              <div className="table-cell-title">ID del desafío</div>
              <div className="table-cell-title">Nombre del desafío</div>
              <div className="table-cell-title">ID del estado actual del desafío</div>
            </div>
            
        {filteredChallenges.map((challenge) => (
              <div key={challenge.id} className="table-row challenge-description" onClick={() => navigate(`/card/${challenge.id}`)}>
                <div className="table-cell">{challenge.id}</div>
                <div className="table-cell">{challenge.name}</div>
                <div className="table-cell">{challenge.actual_state_id}</div>
              </div>
            ))}
          </div>
        ))}
>>>>>>> develop
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> develop
