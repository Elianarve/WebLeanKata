import { useForm } from 'react-hook-form';
import { postResult } from '../../services/resultServices';
import './css/Forms.css';


const Result = ({editExperimentId, setLoading, setCreateResult}) => {
    const { handleSubmit, register, formState: { errors }} = useForm();

    const onSubmit = async (formData) => {
        try {
          const data = {...formData, experiment_id: editExperimentId};
          const response = await postResult(data);
          console.log("Resultado creado:", response.data);
          setLoading(true);
          setCreateResult(false);
        } catch (error) {
          console.error("Error al crear el resultado:", error);
        }
      };

      const closeForm = () => {
        setCreateResult(false);
      };
    
      
      return (
        <div className="form-container">
        <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
        <h2>CREAR RESULTADO</h2>
          <div className='items'>
            <label className='label-item'>Descripción:</label>
            <textarea type="text" rows="10" cols="50" {...register('description', { required: true })} />
            {errors.description && <p className="error-message">La descripción es requerida</p>}
          </div>
          <div className='items'>
            <label className='label-item'>Fecha:</label>
          <div className='date-input-wrapper'>
            <input type="date" {...register('date', { required: true })} />
            <span className='date-icon'>&#x1F4C5;</span>
        </div>
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
          <button className='button-forms' type="submit">Enviar</button>
         <button className='button-forms' onClick={closeForm}>Cerrar</button>
        </form>
        </div>
      )}

export default Result;