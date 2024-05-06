import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenge } from '../../services/challengeServices'; 
import './Home.css';

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengesData = await getChallenge();
        setChallenges(challengesData); 
      } catch (error) {
        console.error('Error fetching retos:', error);
        setError('No se pudieron cargar los desafíos. Por favor, inténtalo de nuevo más tarde.');
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className='home-relief'>

    <div className="home-container">
      <h2>Retos</h2>

      <h3>
        <span>ID</span>
        <span>Descripción</span>
        <span>Estado</span>
      </h3>
      <div className="gallery-items">
        {error && <p className="error-message">{error}</p>}
        <div className="challenge-table">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="challenge-wrapper">
              <div className="table-row challenge-description" onClick={() => navigate(`/card/${challenge.id}`)}>
                <span>{challenge.id}</span>
                <span>{challenge.name}</span>
                <span>{challenge.actual_state_id}</span>
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
