import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postMentalContrast } from '../../services/mentalContrastServices';

const ContrastMetal = () => {
  const { handleSubmit, register, formState: { errors }} = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      const response = await postMentalContrast(data);
      console.log("Contraste mental creado correctamente:", response.data);
      navigate('/obstacle');
    } catch (error) {
      console.error("Error al crear el contraste mental:", error);
    }
  };
  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Contraste mental: </h2>
      <div className='items'>
          <label className='label-item'>Puntuación</label>
          <input type="number" min="1" max="10" {...register('points', { required: true })} />
          {/* {errors.name && <p className="error-message">El nombre es requerido</p>} */}
        </div>
    <div className='items'>
    <label className='label-item'>Fecha de evaluación:</label>
    <input type="date" {...register('evaluation_date', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
        <button type="submit">Enviar</button>
    </form>
  )
}

export default ContrastMetal