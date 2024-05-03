import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postLearning } from '../../services/learningsServices';

const Learning = () => {
    const { handleSubmit, register, formState: { errors }} = useForm();
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
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Aprendizaje:</h2>
      <div className='items'>
          <label className='label-item'>Descripción: </label>
          <input type="text" {...register('description', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
    <div className='items'>
    <label className='label-item'>Fecha de aprendizaje:</label>
    <input type="date" {...register('learning_date', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
       </div>
  
  <button type="submit">Enviar</button>
    </form>
  )
}

export default Learning