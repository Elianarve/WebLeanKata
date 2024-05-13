import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneProcess, updateProcess, deleteProcess } from '../../services/processServices';
import { useParams, useNavigate } from 'react-router-dom';
import '../forms/css/Forms.css';



const EditProcess = () => {
  const { id } = useParams();
  const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
  const [processData, setProcessData] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneProcess(id);
      const processData = response.data;
      setProcessData(processData);
      setValue('description', processData.description);
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (processData) => {
    try {
      await updateProcess(id, processData);
      alert('¡Los datos del elemento han sido actualizados correctamente!');
      reset();
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    }
  };
        
  return (
    <div className="form-container">
    <div className="form-center">
    <h2>Editar proceso</h2>

      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
        <div className='items'>
          <label className='label-item'>Descripción </label>
          <textarea type="text" rows="10" cols="50" name="description" defaultValue={processData.description } {...register('description', { required: true })}/>
          {/* {errors.model?.type === 'required' && <p className="error-message">El campo modelo es requerido</p>}  */}
        </div>
        <button onClick={() => deleteProcess(id).then(() => navigate("/home")) }>Eliminar</button>
        <input type="submit" value="Editar" />
      </form>
      </div>
      </div>
  );
}

export default EditProcess;