import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postTask } from '../../services/taskServices';

function Task() {
  const { handleSubmit, register, formState: { errors, isDirty }, getValues } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await postTask(data);
      console.log("Tarea creada:", response.data);
      navigate('/result');
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  const compareDates = (date1, date2) => {
    return new Date(date1) > new Date(date2);
  };

  const validateEndDate = (value) => {
    const startDate = getValues('start_date');
    return compareDates(value, startDate) || "La fecha final debe ser posterior a la fecha de inicio";
  };

  const validateRealEndDate = (value) => {
    const startDate = getValues('start_date');
    const endDatePrev = getValues('end_date_prev');
    return compareDates(value, startDate) && compareDates(value, endDatePrev) || "La fecha real debe ser posterior a la fecha de inicio y a la fecha final prevista";
  };

  return (
    <div className="form-container">
      <div className="form-center">
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Tarea:</h2>
      <div className='items'>
        <label className='label-item'>Descripción:</label>
        <textarea type="text" {...register('description', { required: true })} />
        {errors.description && <p className="error-message">La descripción es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Responsable:</label>
        <input type="text" {...register('responsible', { required: true })} />
        {errors.responsible && <p className="error-message">El responsable es requerido</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de inicio:</label>
        <input type="date" {...register('start_date', { required: true })} />
        {errors.start_date && <p className="error-message">La fecha de inicio es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha final prevista:</label>
        <input type="date" {...register('end_date_prev', { required: true, validate: validateEndDate })} />
        {errors.end_date_prev && <p className="error-message">{errors.end_date_prev.message}</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha real:</label>
        <input type="date" {...register('end_date_real', { required: true, validate: validateRealEndDate })} />
        {errors.end_date_real && <p className="error-message">{errors.end_date_real.message}</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Estado:</label>
        <input type="text" {...register('state', { required: true })} />
        {errors.state && <p className="error-message">El estado es requerido</p>}
      </div>
      <button type="submit" disabled={!isDirty} className='button-forms'>Enviar</button>
    </form>
    </div>
    </div>
  )
}

export default Task;