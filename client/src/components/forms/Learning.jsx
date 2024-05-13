import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postLearning } from '../../services/learningsServices';

const Learning = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await postLearning(data);
      console.log("Aprendizaje creado:", response.data);
      navigate('/');
    } catch (error) {
      console.error("Error al crear el aprendizaje:", error);
    }
  };


  return (
    <div className="form-container">
      <div className="form-center">
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
    </form>
    </div>
    </div>
  )
}

export default Learning