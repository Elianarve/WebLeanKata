import { useForm } from 'react-hook-form';
import './css/Forms.css';
import { postTargetState } from '../../services/targetStateServices';

const TargetState = ({setLoading, setCreateTarget}) => {
  const { handleSubmit, register, formState: { errors }, watch  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await postTargetState(data);
      console.log("Desafío creado:", response.data);
      setLoading(true);
      setCreateTarget(false);
    } catch (error) {
      console.error("Error al crear el desafío:", error);
    }
  };

  const validateDate = (value) => {
    const startDate = new Date(watch('start_date'));
    const endDate = new Date(value);
    return startDate < endDate;
  };

  const closeForm = () => {
    setCreateTarget(false);
  };

  return (
    <div className="form-container">
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>CREAR ESTADO OBJETIVO</h2>
      <div className='items'>
        <label className='label-item'>Descripción: </label>
        <textarea type="text" rows="10" cols="50" {...register('description', { required: 'La descripción es requerida'})} />
        {errors.description && <p className="error-message">{errors.description.message}</p>} 
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de Inicio:</label>
        <input type="date" {...register('start_date', { required: true })} />
        {errors.start_date && <p className="error-message">La fecha de inicio es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de Meta:</label>
        <input type="date" {...register('date_goal', {required: true, validate: {futureDate: validateDate}})} />
        {errors.date_goal && errors.date_goal.type === 'futureDate' && <p className="error-message">La fecha de meta debe ser posterior a la fecha de inicio</p>}
        {errors.date_goal && errors.date_goal.type !== 'futureDate' && <p className="error-message">La fecha de meta es requerida</p>}
      </div>
      <button className='button-forms' type="submit">Enviar</button>
     <button className='button-forms' onClick={closeForm}>Cerrar</button>
    </form>
    </div>
  )}

export default TargetState;