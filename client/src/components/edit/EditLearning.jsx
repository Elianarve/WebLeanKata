import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneLearning, updateLearning, deleteLearning } from '../../services/learningsServices';
import { useParams, useNavigate } from 'react-router-dom';
import '../forms/css/Forms.css';


const EditLearning = () => {
  const { id } = useParams();
  const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
  const [ learningData, setLearningData] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneLearning(id);
      const learningData = response.data;
      setLearningData(learningData);
      setValue('description', learningData.description);
      setValue('learning_date', learningData.learning_date);
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (learningData) => {
    try {
      await updateLearning(id, learningData);
      alert('¡Los datos del elemento han sido actualizados correctamente!');
      reset();
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    }
  };
        
  return (
    <div className="form-container">
    <h2>Editar el aprendizaje</h2>

      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
        <div className='items'>
          <label className='label-item'>Descripción</label>
          <textarea type="text" rows="10" cols="50" name="description" defaultValue={learningData.description } {...register('description', { required: true })}/>
          {/* {errors.model?.type === 'required' && <p className="error-message">El campo modelo es requerido</p>}  */}
        </div>
        <div className='items'>
          <label className='label-item'>Fecha de aprendizaje</label>
          <input type="date" name="learning_date" defaultValue={learningData.learning_date} {...register('learning_date', {required: true })}/>
          {/* {errors.speeds?.type === 'pattern' && <p className="error-message">La velocidad debe ser un valor numérico</p>}
          {errors.speeds?.type === 'required' && <p className="error-message">El campo velocidades es requerido</p>} */}
        </div>
        <button onClick={() => deleteLearning(id).then(() => navigate("/home")) }>Eliminar</button>
        <input type="submit" value="Editar" />
      </form>
      </div>
  );
}

export default EditLearning;