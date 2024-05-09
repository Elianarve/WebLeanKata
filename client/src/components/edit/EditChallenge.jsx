import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneChallenge, updateChallenge, deleteChallenge } from '../../services/challengeServices';
import { useParams, useNavigate } from 'react-router-dom';
import '../forms/css/Forms.css';

const EditChallenge = () => {
  const { id } = useParams();
  const { register, formState: {errors}, handleSubmit, reset, setValue } = useForm();
  const [challengeData, setChallengeData] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
        const response = await getOneChallenge(id);
        const challengeData = response.data;
        // const challengeData = challengeArray.find(challenge => challenge._id === id); 
          setChallengeData(challengeData);
          setValue('name', challengeData.name);
          setValue('description', challengeData.description);
          setValue('start_date', challengeData.start_date);
          setValue('end_date', challengeData.end_date);
        };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (challengeData) => {
    try {
      await updateChallenge(id, challengeData);
      alert('¡Los datos del reto han sido actualizados correctamente!');
      reset();
    } catch (error) {
      console.error('Error al actualizar el reto:', error);
      alert('Error al actualizar el reto. Por favor, intenta nuevamente.');
    }
  };

  return (

      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>

        <h2>Editar Reto</h2>
        <div className='items'>
          <label className='label-item'>Nombre</label>
          <input type="text" name="name" defaultValue={challengeData.name} {...register('name', {required: true })}/>
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Descripción</label>
          <textarea rows="10" cols="50" name="description" defaultValue={challengeData.description} {...register('description', { required: true })}/>
          {/* {errors.description && <p className="error-message">La descripción es requerida</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Fecha de inicio</label>
          <input type="date" name="start_date" defaultValue={challengeData.start_date} {...register('start_date', { required: true })}/>
          {/* {errors.start_date && <p className="error-message">La fecha de inicio es requerida</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Fecha de fin</label>
          <input type="date" name="end_date" defaultValue={challengeData.end_date} {...register('end_date', { required: true })}/>
          {/* {errors.end_date && <p className="error-message">La fecha de fin es requerida</p>} */}
        </div>
        <button onClick={() => deleteChallenge(id).then(() => navigate("/home")) }>Eliminar</button>
        <input type="submit" value="Editar" />
      </form>
  );
}

export default EditChallenge;