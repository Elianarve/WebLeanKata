import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneReto } from '../../services/service'; 
import SelectAllRetos from '../selectall/selectAllRetos';

const Card = () => {
  const { id } = useParams();
  const [reto, setReto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReto = async () => {
      try {
        const retoData = await getOneReto(id);
        setReto(retoData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReto();
  }, [id]);


  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!reto) {
    return <div>No se encontró el reto</div>;
  }

  return (
    <div className="CardContainer">
      <SelectAllRetos retoId={id} />
      <p>Estado: {reto.estado}</p>
      <p>Descripción: {reto.descripcion}</p>
      <p>Objetivo: {reto.objetivo}</p>
      <p>Obstáculo: {reto.obstaculo}</p>
      <p>Experimento: {reto.experimento}</p>
      <p>Hipótesis: {reto.hipotesis}</p>
      <p>Metodología: {reto.metodologia}</p>
      <p>Grupo de control: {reto.grupo_de_control}</p>
      <p>Criterios de éxito: {reto.criterios_de_exito}</p>
    </div>
  );
};

export default Card;