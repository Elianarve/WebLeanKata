import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenge } from '../../services/challengeServices'; 
import '../../pages/home/Home.css';
import SearchBar from '../../components/searchBar/SearchBar';

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]); // Estado para almacenar los desafíos filtrados
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
        {filteredChallenges.map((challenge) => (
          <div key={challenge.id} className="challenge-description" onClick={() => navigate(`/card/${challenge.id}`)}>
            <div className="challenge-container">
              <p> {challenge.id}</p>
              <p>{challenge.name}</p>
              <p>{challenge.description}</p>
              <p>{challenge.actual_state_id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
