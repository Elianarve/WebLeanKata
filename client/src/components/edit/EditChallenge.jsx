import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneChallenge, updateChallenge } from '../../services/challengeServices';
import { useForm } from 'react-hook-form';
// import '../forms/css/Forms.css';

const EditChallengeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleSubmit, setValue } = useForm();
  const [challengeData, setChallengeData] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challengeData = await getOneChallenge(id);
        console.log('Datos del reto:', challengeData); //💖datos llegado ok
        setChallengeData(challengeData);
        setValue('id', challengeData.id);
  
        setValue('name', challengeData.name);
        setValue('description', challengeData.description);
        setValue('start_date', challengeData.start_date);
        setValue('end_date', challengeData.end_date);
      } catch (error) {
        // setLoading(false);
        // setError(error.message)
        console.error('Error al obtener el desafío:', error);
      }
    };
    fetchChallenge();
  }, [id, setValue]);

  // if (loading) {
  //   return <div>Cargando...</div>;
  // }

  // if (!challengeData) {
  //   return <div>No se encontró el desafío</div>;
  // }

  
  const onSubmit = async (ChallengeData) => {
    try {
      await updateChallenge(id, ChallengeData);
      navigate('/');
    } catch (error) {
      console.error('Error al editar el desafío:', error);
    }
  };

  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>EDITAR CHALLENGE:</h2>
      <div className='items'>
        <label className='label-item'>Nombre</label>
        <input type="text" name='name' defaultValue={challengeData.name } />
      </div>
      <div className='items'>
        <label className='label-item'>Descripción</label>
        <input type="text" name='description' defaultValue={challengeData.description } />
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de inicio:</label>
        <input type="date" name='start_date' defaultValue={challengeData.start_date } />
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de fin:</label>
        <input type="date" name='end_date' defaultValue={challengeData.end_date } />
      </div>
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default EditChallengeForm;
