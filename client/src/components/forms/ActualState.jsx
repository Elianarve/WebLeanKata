import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postActualState } from '../../services/actualStateServices';

const ActualState = () => {
  const { handleSubmit, register, formState: { errors, isDirty }, setValue } = useForm();
  const navigate = useNavigate();
  const [currentDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setValue('date', currentDate);
  }, [currentDate, setValue]);

  const onSubmit = (data) => { 
    postActualState(data).then(() => {
      navigate(`/challenge`); 
    }).catch((error) => {
      console.error("Error al publicar:", error);
    });
  };

  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>ESTADO ACTUAL: </h2>
      <div className='items'>
        <label className='label-item'>Descripción: </label>
        <input 
          type="text" 
          {...register('description', { 
            required: 'La descripción es requerida', 
            pattern: {
              value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
              message: 'Por favor, introduce solo texto'
            }
          })} 
        />
        {errors.description && <p className="error-message">{errors.description.message}</p>} 
      </div>
      <div className='items'>
      <div className='items'>
        <label className='label-item'>Descripción: </label>
        <input 
          type="text" 
          {...register('description', { 
            required: 'La descripción es requerida', 
            pattern: {
              value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
              message: 'Por favor, introduce solo texto'
            }
          })} 
        />
        {errors.description && <p className="error-message">{errors.description.message}</p>} 
      </div>

      <div className='items'>
        <label>Fecha: </label>
        <input type="date" {...register('date', { required: 'La fecha es requerida' })} />
        {errors.date && <p className="error-message">{errors.date.message}</p>} 
      </div>
      </div>
      <button type="submit" disabled={!isDirty}>Enviar</button>
    </form>
  );
}

export default ActualState;