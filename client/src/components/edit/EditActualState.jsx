import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneActualState, updateActualState } from '../../services/actualStateServices';
import { useParams } from 'react-router-dom';
import '../forms/css/Forms.css';

const EditActualState = () => {
  const { id } = useParams();
  const { register, formState: {errors}, handleSubmit, reset, setValue } = useForm();
  const [actualStateData, setActualStateData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneActualState(id);
      const actualStateData = response.data;
      setActualStateData(actualStateData);
      setValue('description', actualStateData.description);
      setValue('date', actualStateData.date);
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (actualStateData) => {
    try {
      await updateActualState(id, actualStateData);
      alert('¡Los datos del elemento han sido actualizados correctamente!');
      reset();
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    }
  };
        
  return (
      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
        <h2>Editar estado actual</h2>
        <div className='items'>
          <label className='label-item'>Descripción </label>
          <textarea type="text" rows="10" cols="50" name="description" defaultValue={actualStateData.description} {...register('description', { required: true })}/>
          {/* {errors.model?.type === 'required' && <p className="error-message">El campo modelo es requerido</p>}  */}
        </div>
        <div className='items'>
          <label className='label-item'>Fecha</label>
          <input type="date" name="date" defaultValue={actualStateData.date } {...register('date', {required: true })}/>
          {/* {errors.speeds?.type === 'pattern' && <p className="error-message">La velocidad debe ser un valor numérico</p>}
          {errors.speeds?.type === 'required' && <p className="error-message">El campo velocidades es requerido</p>} */}
        </div>
        <input type="submit" value="Editar" />
      </form>
  );
}

export default EditActualState;