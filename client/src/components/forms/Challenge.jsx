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
      navigate(`/card/${response.data.id}`);
    } catch (error) {
      console.error("Error al crear el desafío:", error);
    }
  };

  return (
    <>
      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
        <h2>RETO: </h2>
        <div className='items'>
          <label className='label-item'>Nombre</label>
          <input type="text" {...register('name', { required: true })} />
          {errors.name && <p className="error-message">El nombre es requerido</p>}
        </div>
        <div className='items'>
          <label className='label-item'>Descripción</label>
          <input type="text" {...register('description', { required: 'La descripción es requerida', validate: validateText })} />
          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </div>
        <div className='items'>
          <label className='label-item'>Fecha de inicio:</label>
          <input type="date" {...register('start_date', { required: true, validate: validateDateRange })} />
          {errors.start_date && <p className="error-message">{errors.start_date.message}</p>}
        </div>
        <div className='items'>
          <label className='label-item'>Fecha de fin:</label>
          <input type="date" {...register('end_date', { required: true })} />
          {errors.end_date && <p className="error-message">La fecha de fin es requerida</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </>
  )
}

export default Challenge;