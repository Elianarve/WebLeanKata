import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { deleteTask, getOneTask, updateTask } from '../../services/taskServices';
import { useNavigate, useParams } from 'react-router-dom';
import '../forms/css/Forms.css';

const EditTask = () => {
  const { id } = useParams();
  const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
  const [ taskData, setTaskData ] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneTask(id);
      const taskData = response.data;
      setTaskData(taskData);
      setValue('description', taskData.description);
      setValue('responsible', taskData.responsible);
      setValue('start_date', taskData.start_date);
      setValue('end_date_prev', taskData.end_date_prev);
      setValue('end_date_real', taskData.end_date_real);
      setValue('state', taskData.state);
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (taskData) => {
    try {
      await updateTask(id, taskData);
      alert('¡Los datos del elemento han sido actualizados correctamente!');
      reset();
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    }
  };
        
  return (
    <div className="form-container">
    <h2>Tarea: </h2>

         <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <div className='items'>
          <label className='label-item'>Descripción: </label>
          <input type="text" name='description' defaultValue={taskData.description } {...register('description', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Responsable: </label>
          <input type="text" name='responsible' defaultValue={taskData.description } {...register('responsible', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
    <div className='items'>
    <label className='label-item'>Fecha de inicio:</label>
    <input type="date" name='start_date' defaultValue={taskData.start_date } {...register('start_date', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Fecha final prevista:</label>
    <input type="date" name='end_date_prev' defaultValue={taskData.end_date_prev } {...register('end_date_prev', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Fecha real:</label>
    <input type="date" name='end_date_real' defaultValue={taskData.end_date_real } {...register('end_date_real', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
          <label className='label-item'>Estado:</label>
          <input type="text" name='state' defaultValue={taskData.state} {...register('state', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='buttons-container'>
     <button className="delete button" onClick={() => deleteTask(id).then(() => navigate("/home")) }>Eliminar</button>
     <button className='edit button' type="submit">Editar</button>
     </div>
         </form>
         </div>
     );
}   
   
export default EditTask;