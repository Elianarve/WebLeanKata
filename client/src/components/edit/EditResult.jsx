import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneResult, updateResult } from '../../services/resultServices';
import '../forms/css/Forms.css';

const EditResult = ({resultId, setLoading, setEditable}) => {
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const [ resultData, setResultData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneResult(resultId);
      const resultData = response.data;
      setResultData(resultData);
      setValue('description', resultData.description);
      setValue('date', resultData.date);
      setValue('analysis', resultData.analysis);
      setValue('expected_results', resultData.expected_results);
      setValue('results_obtained', resultData.results_obtained);
      setValue('conclusion', resultData.conclusion);
      setValue('next_step', resultData.next_step);
    };

    fetchData();
  }, [resultId, setValue]);

  const onSubmit = async (resultData) => {
    try {
      await updateResult(resultId, resultData);
      alert('¡Los datos del elemento han sido actualizados correctamente!');
      setLoading(true);
      setEditable(false);
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    }
  };
        
  return (
    <div className="form-container">
      <h2>Resultado: </h2>

      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <div className='items'>
          <label className='label-item'>Descripción: </label>
          <input type="text" name='description' defaultValue={ resultData.description } {...register('description', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
    <div className='items'>
    <label className='label-item'>Fecha:</label>
    <input type="date" name='date' defaultValue={ resultData.date } {...register('date', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
          <label className='label-item'>Analisis:</label>
          <input type="text" name='analysis' defaultValue={ resultData.analysis } {...register('analysis', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Resultados previstos:</label>
          <input type="text" name='expected_results' defaultValue={ resultData.expected_results } {...register('expected_results', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Resultados obtenidos:</label>
          <input type="text" name='results_obtained' defaultValue={ resultData.results_obtained } {...register('results_obtained', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Conclusión:</label>
          <input type="text" name='conclusion' defaultValue={ resultData.conclusion } {...register('conclusion', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Siguiente paso:</label>
          <input type="text" name='next_step' defaultValue={ resultData.next_step } {...register('next_step', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <button type="submit">Editar</button>
        <button onClick={() => setEditable(false)}>Cerrar</button>
      </form>
      </div>
  );
}

export default EditResult;