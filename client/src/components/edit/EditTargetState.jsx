import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {  getOneTargetState, updateTargetState } from '../../services/targetStateServices';
import '../forms/css/Forms.css';

const EditTargetState = ({editTargetId, setLoading, setEditTargetState}) => {
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const [ targetStateData, setTargetStateData ] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneTargetState(editTargetId);
      const targetStateData = response.data;
      setTargetStateData(targetStateData);
      setValue('description', targetStateData.description);
      setValue('date', targetStateData.start_date);
      setValue('analysis', targetStateData.date_goal);
    };

    fetchData();
  }, [editTargetId, setValue]);

  const onSubmit = async (targetStateData) => {
    try {
      await updateTargetState(editTargetId, targetStateData);
      alert('¡Los datos del elemento han sido actualizados correctamente!');
      setLoading(true);
      setEditTargetState(false);
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    }
  };
        
  return (
    <div className="form-container">
         <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
    <h2>EDITAR ESTADO OBJETIVO</h2>
     <div className='items'>
       <label className='label-item'>Descripción</label>
       <textarea type="text" name='description' defaultValue={targetStateData.description } {...register('description', { required: true })} />
       {errors.name && <p className="error-message">El nombre es requerido</p>}
     </div>
     <div className='items'>
       <label className='label-item'>Fecha de Inicio:</label>
       <input type="date" name='start_date' defaultValue={targetStateData.start_date } {...register('start_date', { required: true })} />
       {errors.endDate && <p className="error-message">La fecha de fin es requerida</p>}
     </div>
     <div className='items'>
       <label className='label-item'>Fecha de Meta:</label>
       <input type="date" name='date_goal' defaultValue={targetStateData.date_goal } {...register('date_goal', { required: true })} />
       {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>}
     </div>
     <button className='button-forms' type="submit">Editar</button>
     <button className='button-forms' onClick={() => setEditTargetState(false)}>Cerrar</button>
         </form>
         </div>
     );
}   
   
export default EditTargetState;