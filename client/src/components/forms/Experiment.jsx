import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postExperiment } from '../../services/experimentServices';

const Experiment = () => {
    const { handleSubmit, register, formState: { errors }} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
          const response = await postExperiment(data);
          console.log("Experemiento creado:", response.data);
          navigate('/task');
        } catch (error) {
          console.error("Error al crear el experimento:", error);
        }
      };

  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Experimento: </h2>
      <div className='items'>
          <label className='label-item'>Descripción</label><br></br>
          <input className='inputsForm' type="text" {...register('description', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
    <div className='items'>
    <label className='label-item'>Fecha de inicio:</label><br></br>
    <input className='inputsFormDate' type="date" {...register('start_date', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Fecha de fin:</label><br></br>
    <input className='inputsFormDate' type="date" {...register('end_date', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Objetivos:</label><br></br>
    <input className='inputsForm' type="text" {...register('goals', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Metodología:</label><br></br>
    <input className='inputsForm' type="text" {...register('methodology', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Variables:</label><br></br>
    <input className='inputsForm' type="text" {...register('variables', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Grupo de control:</label><br></br>
    <input className='inputsForm' type="text" {...register('control_group', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Criterios de éxito:</label><br></br>
    <input className='inputsForm' type="text" {...register('success_criteria', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Responsable:</label><br></br>
    <input className='inputsForm' type="text" {...register('responsible', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Estado del experimento:</label><br></br>
    <input className='inputsForm' type="text" {...register('state_experiment', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <button type="submit">Enviar</button>
    </form>
  )
}

export default Experiment;