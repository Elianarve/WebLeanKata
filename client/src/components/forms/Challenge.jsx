import { useNavigate } from 'react-router-dom';
import { postChallenge } from '../../services/challengeServices';
import { useForm } from 'react-hook-form';
import './css/Forms.css';

const Challenge = () => {
  const { handleSubmit, register, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const startDate = watch('start_date');
  const endDate = watch('end_date');

  const validateDateRange = () => {
    if (startDate && endDate) {
      return startDate <= endDate || "La fecha de inicio no puede ser posterior a la fecha de fin";
    }
  };

  const validateText = (value) => {
    if (!value || typeof value !== 'string') {
      return "Por favor, introduce texto";
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await postChallenge(data);
      console.log("Desafío creado:", response.data);
      navigate('/home/actualstate');
    } catch (error) {
      console.error("Error al crear el desafío:", error);
    }
  };

  return (
    <div className="form-box">
      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
        <h2>CREAR RETO</h2>
        <div className='items'>
          <label className='label-item'>Nombre</label>
          <input type="text" {...register('name', { required: true })} />
          {errors.name && <p className="error-message">El nombre es requerido</p>}
        </div>
        <div className='items'>
          <label className='label-item'>Descripción</label>
          <textarea type="text" rows="10" cols="50" {...register('description', { required: 'La descripción es requerida', validate: validateText })} />
          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </div>
        <div className='items'>
          <label className='label-item'>Fecha de inicio:</label>
          <div className='date-input-wrapper'>
            <input type="date" {...register('start_date', { required: true, validate: validateDateRange })} />
            <span className='date-icon'>&#x1F4C5;</span>
          </div>
          {errors.start_date && <p className="error-message">La fecha de inicio es requerida</p>}
        </div>
        <div className='items'>
          <label className='label-item'>Fecha de fin:</label>
          <div className='date-input-wrapper'>
            <input type="date" {...register('end_date', { required: true })} />
            <span className='date-icon'>&#x1F4C5;</span>
          </div>
          {errors.end_date && <p className="error-message">La fecha de fin es requerida</p>}
        </div>
        <button className='button-forms' type="submit">ENVIAR</button>
      </form>
    </div>
  )
}

export default Challenge;
