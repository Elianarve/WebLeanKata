import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postHypothesis } from '../../services/hypothesisServices';

const Hypothesis = () => {
    const { handleSubmit, register, formState: { errors }} = useForm();
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
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Hipotesis: </h2>
      <div className='items'>
          <label className='label-item'>Descripción</label>
          <input type="text" {...register('description', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
    <div className='items'>
    <label className='label-item'>Fecha de plan:</label>
    <input type="date" {...register('plan_date', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
          <label className='label-item'>Estado de hipotesis:</label>
          <input type="text" {...register('state_hipothesis', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
  <button type="submit">Enviar</button>
    </form>
  )
}

export default Hypothesis;