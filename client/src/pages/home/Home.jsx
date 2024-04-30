import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenge } from '../../services/challengeServices'; 
import '../../pages/home/Home.css';
import SearchBar from '../../components/searchBar/SearchBar';

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesData = await getChallenge();
        setChallenges(challengesData); 
      } catch (error) {
        console.error('Error fetching retos:', error);
      }
    };

    fetchChallenges();
  }, []);

  const handleSearch = (searchResults) => {
    setChallenges(searchResults); // Actualiza los desafíos con los resultados de la búsqueda
  };

  return (
    <div className="home-container">
      <SearchBar onSearch={handleSearch} />
      <h2>Retos</h2>
      <div className="gallery-items">
        {challenges.map((challenge) => (
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


