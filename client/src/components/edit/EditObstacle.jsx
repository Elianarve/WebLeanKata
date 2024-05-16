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
      setValue('image',  obstacleData.image);
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
    <div className="form-container">
    <h2>Editar Obstaculo</h2>

      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
        <div className='items'>
        <label className='label-item'>Descripción:</label>
        <input type="text" name="description" defaultValue={ obstacleData.description }  {...register('description', { required: true })} />
        {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
        </div>
        <div className='items'>
        <label className='label-item'>Archivo:</label>
        <input type="file" name="image" defaultValue={ obstacleData.image }  {...register('image', { required: true })} />
        </div>
        <button className="delete button" onClick={() => deleteObstacle(id).then(() => navigate("/home")) }>Eliminar</button>
        <button className='edit button' type="submit">Editar</button>
      </form>
      </div>
  );
}

export default EditObstacle;