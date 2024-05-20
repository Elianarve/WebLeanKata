import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneActualState, updateActualState, } from '../../services/actualStateServices';
import '../forms/css/Forms.css';
import Swal from 'sweetalert2';

const EditActualState = ({ actualStateId, setLoading, setEditable }) => { 
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const [actualStateData, setActualStateData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneActualState(actualStateId); 
      const actualStateData = response.data;
      setActualStateData(actualStateData);
      setValue('description', actualStateData.description);
      setValue('date', actualStateData.date);
    };

    fetchData();
  }, [actualStateId, setValue]);

  const onSubmit = async (actualStateData) => {
    try {
      await updateActualState(actualStateId, actualStateData);
      Swal.fire('¡Los datos del elemento han sido actualizados correctamente!');
      setLoading(true);
      setEditable(false);
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    }
  };
     
  return (
    <div className="form-container">
      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
        <h2>EDITAR ESTADO ACTUAL</h2>
        <div className='items'>
          <label className='label-item'>Descripción </label>
          <textarea type="text" rows="10" cols="50" name="description" defaultValue={actualStateData.description } {...register('description', { required: true })}/>
          {errors.description?.type === 'required' && <p className="error-message">El campo descripción es requerido</p>}
        </div>
        <div className='items'>
          <label className='label-item'>Fecha</label>
        <div className='date-input-wrapper'>
          <input type="date" name="date" defaultValue={actualStateData.date } {...register('date', {required: true })}/>
          <span className='date-icon'>&#x1F4C5;</span>
        </div>
          {errors.date?.type === 'required' && <p className="error-message">El campo fecha es requerido</p>}
        </div>
        <input className='button-forms' type="submit" value="Editar" />
        <button  className='button-forms' onClick={() => setEditable(false)}>Cerrar</button>
      </form>
      </div>
  );
}

export default EditActualState;