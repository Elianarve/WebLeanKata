import { useNavigate } from 'react-router-dom';
import { postProcess  } from '../../services/processServices';
import { useForm } from 'react-hook-form';
import './css/Forms.css';

const Process = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
 
  const onSubmit = (data) => { 
    postProcess(data).then(() => {
        navigate(`/tribe`); 
    })
    .catch((error) => {
      console.error("Error al publicar:", error);
    });
  };

  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>PROCESO: </h2>
      <div className='items'>
        <label className='label-item'>Descripción: </label>
        <textarea
          type="text" 
          {...register('description', { 
            required: 'La descripción es requerida'
          })} 
        />
        {errors.description && <p className="error-message">{errors.description.message}</p>} 
      </div>
        <button className='button-forms' type="submit">ENVIAR</button>
  </form>
  )
}

export default Process;