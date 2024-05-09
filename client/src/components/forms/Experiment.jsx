import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postExperiment } from '../../services/experimentServices';
import { uploadImage } from '../../services/experimentServices';
import { useState } from 'react';

const Experiment = () => {
    const { handleSubmit, register, formState: { errors }} = useForm();
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
          const imageData = new FormData();
      imageData.append("file", data.image[0]); 
      imageData.append("upload_preset", "LeanKata"); 
    
      const responseImage = await uploadImage(imageData); 
      setImageUrl(responseImage.secure_url); 
      const experimentData = { ...data, image: responseImage.secure_url }; 
      console.log(experimentData);
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
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Objetivos:</label>
    <input type="text" {...register('goals', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Metodología:</label>
    <input type="text" {...register('methodology', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Variables:</label>
    <input type="text" {...register('variables', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Grupo de control:</label>
    <input type="text" {...register('control_group', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Criterios de éxito:</label>
    <input type="text" {...register('success_criteria', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Responsable:</label>
    <input type="text" {...register('responsible', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
    <label className='label-item'>Estado del experimento:</label>
    <input type="text" {...register('state_experiment', { required: true })} />
    {/* {errors.startDate && <p className="error-message">La fecha de inicio es requerida</p>} */}
  </div>
  <div className='items'>
  <input type="file" {...register('image', { required: false })} />
          {errors.image && <p className="error-message">Por favor adjunta un archivo</p>}
  </div>
  <button type="submit">Enviar</button>
    </form>
  )
}

export default Experiment;