import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenge } from '../../services/challengeServices'; 
import '../../pages/home/Home.css';
import Search from '../../components/searchBar/SearchBar';

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
       <Search />
      <h2>Retos</h2>
      <div className="gallery-items">
      {challenges.map((challenge) => (
          <div key={challenge.id} className="challenge-description" onClick={() => navigate(`/card/${challenge.id}`)}>
          <div className="challenge-container">{challenge.name}
          <p>{challenge.description}</p>
          <p>{challenge.actualState}</p>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Home;

