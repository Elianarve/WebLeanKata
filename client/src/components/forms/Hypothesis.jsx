import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postHypothesis } from '../../services/hypothesisServices';

const Hypothesis = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await postHypothesis(data);
      console.log("Hipotesis creada:", response.data);
      navigate('/experiment');
    } catch (error) {
      console.error("Error al crear la hipotesis:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-center">
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Hipótesis: </h2>
      <div className='items'>
        <label className='label-item'>Descripción</label>
        <textarea type="text" {...register('description', { required: true })} />
        {errors.description && <p className="error-message">La descripción es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de planificación:</label>
        <input type="date" {...register('plan_date', { required: true, validate: value => new Date(value) > new Date() || 'La fecha de planificación debe ser posterior a la fecha actual' })} />
        {errors.plan_date && <p className="error-message">La fecha de planificación es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Estado de hipótesis:</label>
        <input type="text" {...register('state_hypothesis', { required: true })} />
        {errors.state_hypothesis && <p className="error-message">El estado de la hipótesis es requerido</p>}
      </div>
      <button type="submit" className='button-forms'>Enviar</button>
    </form>
    </div>
    </div>
  )
}

export default Hypothesis;