import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postMentalContrast } from '../../services/mentalContrastServices';

const ContrastMetal = () => {
  // Función para obtener la fecha actual en el formato deseado
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Obtener funciones y datos de useForm
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      evaluation_date: getCurrentDate() // Establecer la fecha de evaluación como la fecha actual al cargar el formulario
    }
  });
  const navigate = useNavigate();

  // Función para validar que la fecha de evaluación coincida con el día actual
  const validateEvaluationDate = (value) => {
    const currentDate = getCurrentDate();
    if (value !== currentDate) {
      return `La fecha de evaluación debe coincidir con el día actual (${currentDate})`;
    }
  };

  // Función para manejar el envío del formulario
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
        <input type="number" min="1" max="10" {...register('points', { required: 'La puntuación es requerida', min: { value: 1, message: 'La puntuación mínima es 1' }, max: { value: 10, message: 'La puntuación máxima es 10' } })} />
        {errors.points && <p className="error-message">{errors.points.message}</p>} {/* Mostrar mensaje de error si hay errores en la puntuación */}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de evaluación:</label>
        <input type="date" {...register('evaluation_date', { required: true, validate: validateEvaluationDate })} />
        {errors.evaluation_date && <p className="error-message">{errors.evaluation_date.message}</p>} {/* Mostrar mensaje de error si hay errores en la fecha de evaluación */}
      </div>
      <button type="submit">Enviar</button>
    </form>
  )
}

export default ContrastMetal;
