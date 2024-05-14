import { useNavigate } from 'react-router-dom';
import { postTribe } from '../../services/tribeServices';
import { useForm } from 'react-hook-form';
import './css/Forms.css';

const Tribe = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
 
  const onSubmit = (data) => { 
    postTribe(data).then(() => {
        navigate('/actualstate'); 
    })
    .catch((error) => {
      console.error("Error al publicar:", error);
    });
  };

  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>TRIBU: </h2>
      <div className='items'>
        <label className='label-item'>Nombre de la Tribu:</label>
        <textarea
          type="text" 
          {...register('name_tribe', { 
            required: 'El nombre de la tribu es requerido'
          })} 
        />
        {errors.name_tribe && <p className="error-message">{errors.name_tribe.message}</p>} 
      </div>
      <div className='items'>
        <label className='label-item'>Miembros de la tribu:</label>
        <textarea
          type="text" 
          {...register('team_members', { 
            required: 'Los miembros son requeridos'
          })} 
        />
        {errors.team_members && <p className="error-message">{errors.team_members.message}</p>} 
      </div>
        <button className='button-forms' type="submit">ENVIAR</button>
  </form>
  )
}

export default Tribe;