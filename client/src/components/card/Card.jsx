import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneReto } from '../../services/Retoservice'; 
import SelectAllRetos from '../../components/selectall/selectAllRetos';


const Card = () => {
  const { id } = useParams();
  const [reto, setReto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReto = async () => {
      try {
        const retoData = await getOneReto(id); // Llama al método getOneReto para obtener los detalles del reto específico
        setReto(retoData); // Actualiza el estado con los detalles del reto
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
      <SelectAllRetos/>
      <p>Estado: {reto.estado}</p>
      <p>Descripción: {reto.descripcion}</p>
      <p>Objetivo: {reto.objetivo}</p>
      <p>Obstáculo: {reto.obstaculo}</p>
      <p>Experimento: {reto.experimento}</p>
      <p>Hipótesis: {reto.hipotesis}</p>
      <p>Metodología: {reto.metodologia}</p>
      <p>Grupo de control: {reto.grupo_de_control}</p>
      <p>Criterios de éxito: {reto.criterios_de_exito}</p>
      <button className="edit-button" onClick={() => navigate(`/Edit/${reto.id}`)}>
        <img src="src\assets\img\Edit.png" alt="Editar" />
              </button>
          <button className="delete-button" onClick={() => { const confirmDelete = window.confirm('¿Deseas eliminar esta bicicleta?'); if (confirmDelete) { handleDelete(bicycle.id, bicycle.image); navigate(0)}}}>
                <img src="src\assets\img\Delete.png" alt="Eliminar"/>
          </button>
    </div>
  );
};

export default Card;