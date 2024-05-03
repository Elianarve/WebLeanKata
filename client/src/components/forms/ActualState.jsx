import { useNavigate } from 'react-router-dom';
import { postActualState } from '../../services/actualStateServices';
import { useForm } from 'react-hook-form';
import './css/Forms.css';

const ActualState = () => {
  const { handleSubmit, register, formState: { errors }} = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => { 
    postActualState(data).then(() => {
        navigate(`/reto`); 
    })
    .catch((error) => {
      console.error("Error al publicar:", error);
    });
  };

  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>ESTADO ACTUAL: </h2>
        <div className='items'>
          <label className='label-item'>Descripción: </label>
          <input type="text" {...register('description', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
        <label className='label-item'>Fecha: </label>
        <input type="date" {...register('date', { required: true })} />
          {/* {errors.date && <p className="error-message">La fecha es requerida</p>} */}
        </div>
        <button type="submit">Enviar</button>
  </form>
  )
}

export default ActualState;