import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenge } from '../../services/challengeServices'; 
import '../../pages/home/Home.css';

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
      </div>
    </div>
  );
};

export default Home;
