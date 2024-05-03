import { useNavigate } from 'react-router-dom';
import { postObstacle} from '../../services/obstacleServices';
import { useForm } from 'react-hook-form';
import './css/Forms.css';

const Obstacle = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  

  const onSubmit = async (data) => {
    try {
      const response = await postObstacle(data);
      console.log("Hipotesis creado:", response.data);
      navigate('/hypothesis');
    } catch (error) {
      console.error("Error al crear la hipotesis:", error);
    }
  };


  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Obstaculo:</h2>
        <div className='items'>
          <label className='label-item'>Descripción</label>
          <input type="text" {...register('description', { required: true })} />
        </div>
  <button type="submit">Enviar</button>
  </form>
  )
}

export default Obstacle;