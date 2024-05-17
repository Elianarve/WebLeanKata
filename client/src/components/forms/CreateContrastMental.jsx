import { useForm } from 'react-hook-form';
import { postMentalContrast } from '../../services/mentalContrastServices';
import './css/Forms.css';

const ContrastMetal = ({editTargetId, setLoading, setEditContrast}) => {

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      evaluation_date: getCurrentDate()
    }
  });

  const validateEvaluationDate = (value) => {
    const currentDate = getCurrentDate();
    if (value !== currentDate) {
      return `La fecha de evaluación debe coincidir con el día actual (${currentDate})`;
    }
  };

  const onSubmit = async (formData) => {
    try {
      const data = {...formData, target_state_id: editTargetId};
      const response = await postMentalContrast(data);
      console.log("Contraste mental creado correctamente:", response.data);
      setLoading(true);
      setEditContrast(false);
    } catch (error) {
      console.error("Error al crear el contraste mental:", error);
    }
  };

  const closeForm = () => {
    setEditContrast(false);
  };

  return (
     <div className="form-container">
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2> CREAR CONTRASTE MENTAL </h2>
      <div className='items'>
        <label className='label-item'>Puntuación</label>
        <input type="number" min="1" max="10" {...register('points', { required: 'La puntuación es requerida', min: { value: 1, message: 'La puntuación mínima es 1' }, max: { value: 10, message: 'La puntuación máxima es 10' } })} />
        {errors.points && <p className="error-message">{errors.points.message}</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de evaluación:</label>
        <input type="date" {...register('evaluation_date', { required: true, validate: validateEvaluationDate })} />
        {errors.evaluation_date && <p className="error-message">{errors.evaluation_date.message}</p>}
      </div>
      <button className='button-forms' type="submit">Enviar</button>
     <button className="button-forms" onClick={closeForm}>Cerrar</button>
    </form>
    </div> 
  )
}

export default ContrastMetal;