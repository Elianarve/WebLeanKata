import { useNavigate } from 'react-router-dom';
import { postChallenge } from '../../services/challengeServices';

import { useForm } from 'react-hook-form';
import './css/Forms.css';
import Obstacle from './Obstacle';
import TargetState from './TargetState';
import { useState } from 'react';

const Challenge = () => {
  const { handleSubmit, register, formState: { errors }} = useForm();
  const navigate = useNavigate();
  // const [targetState, setTargetState] = useState(false);
  // const [obstacle, setObstacle] = useState(false);
  

  const onSubmit = async (data) => {
    try {
      const response = await postChallenge(data);
      console.log("Desafío creado:", response.data);
      navigate('/targetstate');
    } catch (error) {
      console.error("Error al crear el desafío:", error);
    }
  };

  return (
    <>
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>RETO: </h2>
        <div className='items'>
          <label className='label-item'>Nombre</label>
          <input type="text" {...register('name', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Descripción</label>
          <input type="text" {...register('description', { required: true })} />
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
  {/* {targetState && <TargetState />}
  {obstacle && <Obstacle />} */}
  </>
  )
}

export default Challenge;