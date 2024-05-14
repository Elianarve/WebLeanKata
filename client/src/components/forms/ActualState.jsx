import { useNavigate } from 'react-router-dom';
import { postActualState } from '../../services/actualStateServices';
import { useForm } from 'react-hook-form';
import './css/Forms.css';
import { useState, useEffect } from 'react';

const ActualState = () => {
  const { handleSubmit, register, formState: { errors, isDirty }, setValue } = useForm();
  const navigate = useNavigate();
  const [currentDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setValue('date', currentDate);
  }, [currentDate, setValue]);


  const onSubmit = (data) => { 
    postActualState(data).then(() => {
        navigate('/challenge'); 
    })
    .catch((error) => {
      console.error("Error al publicar:", error);
    });
  };

  return (
    <div className="form-container">
      <div className="form-center">
      <h2>ESTADO ACTUAL: </h2>       
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <div className='items'>
        <label className='label-item'>Descripción: </label>
        <textarea type="text" {...register('description', { required: 'La descripción es requerida'})} />
        {errors.description && <p className="error-message">{errors.description.message}</p>} 
      </div>
      <div className='items'>
        <label>Fecha: </label>
        <input type="date" {...register('date', { required: 'La fecha es requerida'})}/>
        {errors.date && <p className="error-message">{errors.date.message}</p>} 
      </div>
        <button className='button-forms' type="submit" disabled={!isDirty}>ENVIAR</button>
  </form>
  </div>
  </div>
  )}

export default ActualState;