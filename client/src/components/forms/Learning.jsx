import { useForm } from 'react-hook-form';
import { postLearning } from '../../services/learningsServices';

const Learning = ({editResultId, setLoading, setCreateLearning}) => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    try {
      const data = {...formData, results_id:editResultId};
      const response = await postLearning(data);
      console.log("Aprendizaje creado:", response.data);
      setLoading(true);
      setCreateLearning(false);
    } catch (error) {
      console.error("Error al crear el aprendizaje:", error);
    }
  };

  const closeForm = () => {
    setCreateLearning(false);
  };


  return (
    <div className="form-container">
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
    <h2>Aprendizaje:</h2>
      <div className='items'>
        <label className='label-item'>Descripción:</label>
        <textarea type="text" {...register('description', { required: true })} />
        {errors.description && <p className="error-message">La descripción es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de aprendizaje:</label>
        <input type="date" {...register('learning_date', { required: true })} />
        {errors.learning_date && <p className="error-message">{errors.learning_date.message}</p>}
      </div>
      <button type="submit" className='button-forms'>Enviar</button>
     <button onClick={closeForm}>Cerrar</button>
    </form>
    </div>
  )}
export default Learning