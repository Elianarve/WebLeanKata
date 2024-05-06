import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {postResult } from '../../services/resultServices';

const Result = () => {
    const { handleSubmit, register, /*formState: { errors }*/} = useForm();
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
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Resultado: </h2>
      <div className='items'>
          <label className='label-item'>Descripción: </label>
          <input type="text" {...register('description', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
    <div className='items'>
    <label className='label-item'>Fecha:</label>
    <input type="date" {...register('date', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
          <label className='label-item'>Analisis:</label>
          <input type="text" {...register('analysis', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Resultados previstos:</label>
          <input type="text" {...register('expected_results', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Resultados obtenidos:</label>
          <input type="text" {...register('results_obtained', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Conclusión:</label>
          <input type="text" {...register('conclusion', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Siguiente paso:</label>
          <input type="text" {...register('next_step', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
  <button type="submit">Enviar</button>
    </form>
  )
}

export default Result