import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneTargetState, updateTargetState } from '../../services/targetStateServices';
import { useParams } from 'react-router-dom';
import '../forms/css/Forms.css';


const EditTargetState = () => {
  const { id } = useParams();
  const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
  const [ targetStateData, setTargetStateData ] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneTargetState(id);
      const targetStateData = response.data;
      setTargetStateData(targetStateData);
      setValue('description', targetStateData.description);
      setValue('date', targetStateData.start_date);
      setValue('analysis', targetStateData.date_goal);
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (targetStateData) => {
    try {
      await updateTargetState(id, targetStateData);
      alert('¡Los datos del elemento han sido actualizados correctamente!');
      reset();
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    }
  };
        
  return (
         <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
    <h2>Estado objetivo: </h2>
     <div className='items'>
       <label className='label-item'>Descripción</label>
       <input type="text" name='description' defaultValue={targetStateData.description } {...register('description', { required: true })} />
       {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
     </div>
     <div className='items'>
       <label className='label-item'>Fecha de Inicio:</label>
       <input type="date" name='start_date' defaultValue={targetStateData.date } {...register('start_date', { required: true })} />
       {/* {errors.endDate && <p className="error-message">La fecha de fin es requerida</p>} */}
     </div>
     <div className='items'>
       <label className='label-item'>Fecha de Meta:</label>
       <input type="date" name='date_goal' defaultValue={targetStateData.date_goal } {...register('date_goal', { required: true })} />
       {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
     </div>
     <button type="submit">Editar</button>
         </form>
     );
}   
   
export default EditTargetState;