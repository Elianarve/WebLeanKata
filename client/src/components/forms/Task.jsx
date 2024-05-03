import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postTask } from '../../services/taskServices';

function Task() {
    const { handleSubmit, register, formState: { errors }} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
          const response = await postTask(data);
          console.log("Tarea creada:", response.data);
          navigate('/result');
        } catch (error) {
          console.error("Error al crear la tarea:", error);
        }
      };

  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Tarea: </h2>
      <div className='items'>
          <label className='label-item'>Descripción: </label>
          <input type="text" {...register('description', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
        <div className='items'>
          <label className='label-item'>Responsable: </label>
          <input type="text" {...register('responsible', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
    <div className='items'>
    <label className='label-item'>Fecha de inicio:</label>
    <input type="date" {...register('start_date', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Fecha final prevista:</label>
    <input type="date" {...register('end_date_prev', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Fecha real:</label>
    <input type="date" {...register('end_date_real', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
          <label className='label-item'>Estado:</label>
          <input type="text" {...register('state', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
  <button type="submit">Enviar</button>
    </form>
  )
}

export default Task;