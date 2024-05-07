import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneObstacle, updateObstacle, deleteObstacle } from '../../services/obstacleServices';
import { useParams, useNavigate } from 'react-router-dom';
import '../forms/css/Forms.css';


const EditObstacle = () => {
  const { id } = useParams();
  const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
  const [ obstacleData, setObstacleData ] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneObstacle(id);
      const  obstacleData = response.data;
      setObstacleData( obstacleData);
      setValue('description',  obstacleData.description);
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async ( obstacleData) => {
    try {
      await updateObstacle(id,  obstacleData);
      alert('¡Los datos del elemento han sido actualizados correctamente!');
      reset();
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
        <button onClick={() => deleteObstacle(id).then(() => navigate("/home")) }>Eliminar</button>
        <button type="submit">Editar</button>
      </form>
  );
}

export default EditObstacle;