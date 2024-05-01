import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenge } from '../../services/challengeServices'; 
import '../../pages/home/Home.css';

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

  

  return (
    <div className="home-container">
      <h2>Retos</h2>
      <div className="gallery-items">
      {challenges.map((challenge) => (
          <div key={challenge.id} className="challenge-description" onClick={() => navigate(`/card/${challenge.id}`)}>
          {challenge.description}
          </div>
        ))}
      </div>
    </div>
  );
};


export default Home;

