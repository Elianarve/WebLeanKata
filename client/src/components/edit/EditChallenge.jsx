import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneChallenge, updateChallenge } from '../../services/challengeServices';
import '../forms/css/Forms.css';

const EditChallenge = ({ challengeId, setLoading, setEditable }) => {
  const { register, formState: {errors}, handleSubmit,  setValue } = useForm();
  const [challengeData, setChallengeData] = useState({});

  
  useEffect(() => {
    const fetchData = async () => {
        const response = await getOneChallenge(challengeId);
        const challengeData = response.data;
          setChallengeData(challengeData);
          setValue('name', challengeData.name);
          setValue('description', challengeData.description);
          setValue('start_date', challengeData.start_date);
          setValue('end_date', challengeData.end_date);
        };

    fetchData();
  }, [challengeId, setValue]);

  const onSubmit = async (challengeData) => {
    try {
      await updateChallenge(challengeId, challengeData);
      alert('¡Los datos del reto han sido actualizados correctamente!');
      setLoading(true);
      setEditable(false);
    } catch (error) {
      console.error('Error al actualizar el reto:', error);
      alert('Error al actualizar el reto. Por favor, intenta nuevamente.');
    }
  };

  return (

    <div className="form-container">
    <h2>Editar Reto</h2>

      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>

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
        <input type="submit" value="Editar" />
        <button onClick={() => setEditable(false)}>Cerrar</button>
      </form>
      </div>
  );
}

export default EditChallenge;