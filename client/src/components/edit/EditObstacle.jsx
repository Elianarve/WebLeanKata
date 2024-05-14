import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneObstacle, updateObstacle} from '../../services/obstacleServices';
import '../forms/css/Forms.css';


const EditObstacle = ({editObstacleId, setLoading, setEditObstacle}) => {
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const [ obstacleData, setObstacleData ] = useState({});

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneObstacle(editObstacleId);
      const  obstacleData = response.data;
      setObstacleData( obstacleData);
      setValue('description',  obstacleData.description);
    };

    fetchData();
  }, [editObstacleId, setValue]);

  const onSubmit = async (obstacleData) => {
    try {
      await updateObstacle(editObstacleId, obstacleData);
      alert('¡Los datos del elemento han sido actualizados correctamente!');
      setLoading(true);
      setEditObstacle(false);
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    }
  };
        
  return (
      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
        <h2>Editar Obstaculo</h2>
        <div className='items'>
        <label className='label-item'>Descripción:</label>
        <input type="text" name="description" defaultValue={ obstacleData.description }  {...register('description', { required: true })} />
        {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
        </div>
        <button type="submit">Editar</button>
        <button onClick={() => setEditObstacle(false)}>Cerrar</button>
      </form>
  );
}

export default EditObstacle;