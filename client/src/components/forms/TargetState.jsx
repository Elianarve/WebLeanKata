import { useForm } from 'react-hook-form';

const TargetState = () => {
    const { handleSubmit, register, formState: { errors }} = useForm();
    
  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Estado actual: </h2>
  <div className='items'>
    <label className='label-item'>Descripción</label>
    <input type="text-input" {...register('description', { required: true })} />
    {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Fecha de Inicio:</label>
    <input type="date" {...register('start_date', { required: true })} />
    {/* {errors.endDate && <p className="error-message">La fecha de fin es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Fecha de Meta:</label>
    <input type="date" {...register('date_goal', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <button type="submit">Enviar</button>
  </form>
  )
}

export default TargetState;