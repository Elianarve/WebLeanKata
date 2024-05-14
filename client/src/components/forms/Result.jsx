import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postResult } from '../../services/resultServices';

const Result = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await postResult(data);
      console.log("Resultado creado:", response.data);
      navigate('/learning');
    } catch (error) {
      console.error("Error al crear el resultado:", error);
    }
  };
      
  return (
    <div className="form-container">
      <div className="form-center">
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Resultado:</h2>
      <div className='items'>
        <label className='label-item'>Descripción:</label>
        <textarea type="text" {...register('description', { required: true })} />
        {errors.description && <p className="error-message">La descripción es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha:</label>
        <input type="date" {...register('date', { required: true })} />
        {errors.date && <p className="error-message">La fecha es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Análisis:</label>
        <input type="text" {...register('analysis', { required: true })} />
        {errors.analysis && <p className="error-message">El análisis es requerido</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Resultados previstos:</label>
        <input type="text" {...register('expected_results', { required: true })} />
        {errors.expected_results && <p className="error-message">Los resultados previstos son requeridos</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Resultados obtenidos:</label>
        <input type="text" {...register('results_obtained', { required: true })} />
        {errors.results_obtained && <p className="error-message">Los resultados obtenidos son requeridos</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Conclusión:</label>
        <input type="text" {...register('conclusion', { required: true })} />
        {errors.conclusion && <p className="error-message">La conclusión es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Siguiente paso:</label>
        <input type="text" {...register('next_step', { required: true })} />
        {errors.next_step && <p className="error-message">El siguiente paso es requerido</p>}
      </div>
      <button type="submit" className='button-forms'>Enviar</button>
    </form>
    </div>
    </div>    
  )}

export default Result;