import { useNavigate } from 'react-router-dom';
import { postChallenge } from '../../services/challengeService';
import { useForm } from 'react-hook-form';


const Challenge = () => {
  const { handleSubmit, register, formState: { errors }} = useForm();
  const navigate = useNavigate();
  

  const onSubmit = async (data) => {
    try {
      const response = await postChallenge(data);
      console.log("Desafío creado:", response.data);
      navigate('/home');
    } catch (error) {
      console.error("Error al crear el desafío:", error);
    }
  };


  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>RETO: </h2>
        <div className='items'>
          <label className='label-item'>Nombre</label>
          <input type="text-input" {...register('name', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Descripción</label>
          <input type="text-input" {...register('description', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
    <label className='label-item'>Fecha de inicio:</label>
    <input type="date" {...register('start_date', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Fecha de fin:</label>
    <input type="date" {...register('end_date', { required: true })} />
    {/* {errors.endDate && <p className="error-message">La fecha de fin es requerida</p>} */}
  </div>
  <button type="submit">Enviar</button>
  </form>
  )
}

export default Challenge;