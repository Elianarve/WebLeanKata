import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneChallenge } from '../../services/challengeServices'; 
import SelectAllChallenges from '../selectall/selectAllChallenges';
import TargetSta from '../selectall/TargetSta';
import SelectAllActualState from '../selectall/SelectAllActualState';

const Card = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challengeData = await getOneChallenge(id);    
        setChallenge(challengeData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);


  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!challenge ) {
    return <div>No se encontró el reto</div>;
  }
  
  return (
    <>
    <div className="cardContainer">
      <SelectAllActualState actualStateId={challenge.data.actual_state_id}/>
      <SelectAllChallenges challengeId={id} />
      <TargetSta challengeId={id}/>
    </div>
    </>
  );
};

export default Card;
