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
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
    <h2>CREAR HIPOTESIS</h2>
      <div className='items'>
        <label className='label-item'>Descripción</label>
        <textarea type="text" rows="10" cols="50" {...register('description', { required: true })} />
        {errors.description && <p className="error-message">La descripción es requerida</p>}
      </div>
      <div className='items'>
      <div className='date-input-wrapper'>
        <label className='label-item'>Fecha de planificación:</label>
        <input type="date" {...register('plan_date', { required: true })} />
        <span className='date-icon-hypothesis'>&#x1F4C5;</span>
        </div>
        {errors.plan_date && <p className="error-message">La fecha de planificación es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Estado de hipótesis:</label>
        <input type="text" {...register('state_hypothesis', { required: true })} />
        {errors.state_hypothesis && <p className="error-message">El estado de la hipótesis es requerido</p>}
      </div>
      <button type="submit" className='button-forms'>Enviar</button>
     <button className='button-forms' onClick={closeForm}>Cerrar</button>
    </form>
    </div>
  )}

export default Hypothesis;
