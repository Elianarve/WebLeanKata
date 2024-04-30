import { useState, useEffect } from 'react';
import { getChallenge } from "../../services/challengeServices";
import { useNavigate } from 'react-router-dom';


const SelectAllChallenges = ({ challengeId }) => {
    const [challenges, setChallenges] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchChallenges = async () => {
        try {
          const challengesData = await getChallenge(); 
          setChallenges(challengesData);
        } catch (error) {
          console.error('Error fetching Challenges:', error);
        }
      };
  
      fetchChallenges();
    }, []);

    const handleChange = (event) => {
      const challengeId = event.target.value;
      navigate(`/card/${challengeId}`);
    };

  return (
    <select value={challengeId} onChange={handleChange}>
      {challenges.map((challenge) => (
        <option key={challenge.id} value={challenge.id}>
          {challenge.name} 
        </option>
      ))}
    </select>
  )
}

export default SelectAllChallenges;
