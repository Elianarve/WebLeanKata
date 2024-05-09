import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneChallenge } from '../../services/challengeServices'; 
import SelectAllChallenges from '../selectall/selectAllChallenges';
import TargetSta from '../selectall/TargetSta';
import MentalContras from '../selectall/MentalContras';
import { getOneMentalContrast } from '../../services/mentalContrastServices';
import Obstacle from '../selectall/Obstacle';


const Card = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mentalContrast, setMentalContras] = useState(null);


  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challengeData = await getOneChallenge(id);    
        setChallenge(challengeData);
        setLoading(false);

        const mentalContrastData = await getOneMentalContrast(id);
        setMentalContras(mentalContrastData);

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

  if (!challenge || !mentalContrast) {
    return <div>No se encontró el reto</div>;
  }
  
  return (
    <>
    <div className="cardContainer">
      <SelectAllChallenges challengeId={id} />
      <TargetSta challengeId={id}/>
      <Obstacle />
    </div>
    </>
  );
};

export default Card;
