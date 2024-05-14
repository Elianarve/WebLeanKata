import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postExperiment, uploadImage } from '../../services/experimentServices';
import { useState } from 'react';

const Experiment = () => {
  const { handleSubmit, register, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const onSubmit = async (data) => {
    try {
      if (data.image) {
        const imageData = new FormData();
        imageData.append("file", data.image[0]);
        imageData.append("upload_preset", "LeanKata");

        const responseImage = await uploadImage(imageData);
        setImageUrl(responseImage.secure_url);
        data = { ...data, image: responseImage.secure_url };
      }
      const response = await postExperiment(data);
      console.log("Experimento creado:", response.data);
      navigate('/task');
    } catch (error) {
      console.error("Error al crear el experimento:", error);
    }
  };

  const validateDateRange = (startDate, endDate) => {
    return startDate < endDate || "La fecha de inicio debe ser anterior a la fecha de fin";
  };

  const validateHypothesisDate = (hypothesisDate, startDate) => {
    return hypothesisDate < startDate || "La fecha de planteamiento de la hipótesis debe ser anterior a la fecha de inicio";
  };

  return (
    <div className="form-container">
      <div className="form-center">
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Experimento: </h2>
      <div className='items'>
        <label className='label-item'>Descripción</label>
        <textarea type="text" {...register('description', { required: true })} />
        {errors.description && <p className="error-message">La descripción es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de inicio:</label>
        <input type="date" {...register('start_date', { required: true, validate: value => validateHypothesisDate(value, watch('hypothesis_date')) })} />
        {errors.start_date && <p className="error-message">{errors.start_date.message}</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de planteamiento de la hipótesis:</label>
        <input type="date" {...register('hypothesis_date', { required: true })} />
        {errors.hypothesis_date && <p className="error-message">La fecha de planteamiento de la hipótesis es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de fin:</label>
        <input type="date" {...register('end_date', { required: true, validate: value => validateDateRange(watch('start_date'), value) })} />
        {errors.end_date && <p className="error-message">{errors.end_date.message}</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Objetivos:</label>
        <input type="text" {...register('goals', { required: true })} />
        {errors.goals && <p className="error-message">Los objetivos son requeridos</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Metodología:</label>
        <input type="text" {...register('methodology', { required: true })} />
        {errors.methodology && <p className="error-message">La metodología es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Variables:</label>
        <input type="text" {...register('variables', { required: true })} />
        {errors.variables && <p className="error-message">Las variables son requeridas</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Grupo de control:</label>
        <input type="text" {...register('control_group', { required: true })} />
        {errors.control_group && <p className="error-message">El grupo de control es requerido</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Criterios de éxito:</label>
        <input type="text" {...register('success_criteria', { required: true })} />
        {errors.success_criteria && <p className="error-message">Los criterios de éxito son requeridos</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Responsable:</label>
        <input type="text" {...register('responsible', { required: true })} />
        {errors.responsible && <p className="error-message">El responsable es requerido</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Estado del experimento:</label>
        <input type="text" {...register('state_experiment', { required: true })} />
        {errors.state_experiment && <p className="error-message">El estado del experimento es requerido</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Imagen:</label>
        <input type="file" {...register('image')} />
        {errors.image && <p className="error-message">Por favor, adjunta una imagen</p>}
      </div>
      <button type="submit" className='button-forms'>Enviar</button>
    </form>
    </div>
    </div>
  )
}

export default Experiment;
