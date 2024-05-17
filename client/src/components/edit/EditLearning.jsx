import  { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getOneLearning, updateLearning } from '../../services/learningsServices';
import '../forms/css/Forms.css';


const EditLearning = ({editLearningId, setLoading, setEditLearning}) => {
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const [ learningData, setLearningData] = useState({});

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneLearning(editLearningId);
      const learningData = response.data;
      setLearningData(learningData);
      setValue('description', learningData.description);
      setValue('learning_date', learningData.learning_date);
    };

    fetchData();
  }, [editLearningId, setValue]);

  const onSubmit = async (learningData) => {
    try {
      await updateLearning(editLearningId, learningData);
      alert('¡Los datos del elemento han sido actualizados correctamente!');
      setLoading(true);
      setEditLearning(false);
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    }
  };
        
  return (
    <div className="form-container">
      <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>EDITAR APRENDIZAJE</h2>
        <div className='items'>
          <label className='label-item'>Descripción</label>
          <textarea type="text" rows="10" cols="50" name="description" defaultValue={learningData.description } {...register('description', { required: true })}/>
          {errors.model?.type === 'required' && <p className="error-message">El campo modelo es requerido</p>} 
        </div>
        <div className='items'>
          <label className='label-item'>Fecha de aprendizaje</label>
          <input type="date" name="learning_date" defaultValue={learningData.learning_date} {...register('learning_date', {required: true })}/>
          {errors.speeds?.type === 'pattern' && <p className="error-message">La velocidad debe ser un valor numérico</p>}
          {errors.speeds?.type === 'required' && <p className="error-message">El campo velocidades es requerido</p>}
        </div>
        <input className='button-forms' type="submit" value="Editar" />
        <button className='button-forms' onClick={() => setEditLearning(false)}>Cerrar</button>
      </form>
      </div>
  );
}

export default EditLearning;