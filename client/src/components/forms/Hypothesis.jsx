import { useForm } from 'react-hook-form';
import { postHypothesis } from '../../services/hypothesisServices'
import './css/Forms.css';

const Hypothesis = ({editObstacleId, setLoading, setEditHypothesis}) => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    try {
      const data = {...formData, obstacle_id: editObstacleId}
      console.log(data)
      const response = await postHypothesis(data);
      console.log("Hipotesis creada:", response.data);
      setLoading(true);
      setEditHypothesis(false);
    } catch (error) {
      console.error("Error al crear la hipotesis:", error);
    }};

  const closeForm = () => {
    setEditHypothesis(false);
  };

  return (
    <div className="form-container">
      <div className="form-center">
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Añadir Hipótesis: </h2>
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
     <button onClick={closeForm}>Cerrar</button>

    </form>
    </div>
    </div>
  )}

export default Hypothesis;
