import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneChallenge } from '../../services/challengeServices'; 
import SelectAllChallenges from '../selectall/SelectAllChallenges';

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

  if (!challenge) {
    return <div>No se encontró el reto</div>;
  }

  return (
    <div className="CardContainer">
      <SelectAllChallenges challengeId={id} />
      {/* <p>RetoId: {challenge.id}</p>
      <p>Descripción: {challenge.description}</p>
      <p>Objetivo: {challenge.name}</p>
      <p>Obstáculo: {challenge.start_date}</p>
      <p>Experimento: {challenge.end_date}</p>
      <p>Hipótesis: {challenge.actual_state_id}</p> */}
      {/* <p>Metodología: {challenge.metodologia}</p>
      <p>Grupo de control: {challenge.grupo_de_control}</p>
      <p>Criterios de éxito: {challenge.criterios_de_exito}</p> */}
    </div>
  );
};

export default Card;