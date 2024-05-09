import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postExperiment, uploadImage } from '../../services/experimentServices';
import { useState } from 'react';

const Experiment = () => {
  const { handleSubmit, register, formState: { errors }, setValue, watch } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (!data.image) {
        delete data.image; // Eliminar el campo de imagen si no se adjuntó ninguna
      } else {
        const imageData = new FormData();
        imageData.append("file", data.image[0]); 
        imageData.append("upload_preset", "LeanKata"); 
        const responseImage = await uploadImage(imageData); 
        setImageUrl(responseImage.secure_url); 
        data.image = responseImage.secure_url; // Reemplazar el archivo con su URL
      }
      const response = await postExperiment(data);
      console.log("Experimento creado correctamente:", response.data);
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
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Experimento: </h2>
      <div className='items'>
        <label className='label-item'>Descripción</label>
        <input type="text" {...register('description', { required: true })} />
        {errors.description && <p className="error-message">La descripción es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de planteamiento de la hipótesis:</label>
        <input type="date" {...register('hypothesis_date', { required: true })} />
        {errors.hypothesis_date && <p className="error-message">La fecha de planteamiento de la hipótesis es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Fecha de inicio:</label>
        <input type="date" {...register('start_date', { required: true, validate: value => validateHypothesisDate(value, watch('hypothesis_date')) })} />
        {errors.start_date && <p className="error-message">{errors.start_date.message}</p>}
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
      {/* Agrega validaciones para los demás campos aquí */}
      <div className='items'>
        <label className='label-item'>Imagen:</label>
        <input type="file" {...register('image')} />
        {errors.image && <p className="error-message">Por favor, adjunta una imagen</p>}
      </div>
      <button type="submit">Enviar</button>
    </form>
  )
}

export default Experiment;