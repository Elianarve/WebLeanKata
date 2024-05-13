import { useNavigate } from 'react-router-dom';
import { postObstacle, uploadImage } from '../../services/obstacleServices';
import { useForm } from 'react-hook-form';
import './css/Forms.css';
import { useState } from 'react';

const Obstacle = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
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
      const response = await postObstacle(data);
      console.log("Hipotesis creada:", response.data);
      navigate(`/card/${response.data.id}`);
    } catch (error) {
      console.error("Error al crear la hipotesis:", error);
    }
  };


  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Obstáculo:</h2>
      <div className='items'>
        <label className='label-item'>Descripción</label>
        <textarea type="text" {...register('description', { required: true })} />
        {errors.description && <p className="error-message">La descripción es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Archivo:</label>
        <input type="file" {...register('image', { required: false })} />
        {errors.image && <p className="error-message">Por favor adjunta un archivo</p>}
      </div>
      <button type="submit" className='button-forms'>Enviar</button>
    </form>
  )
}

export default Obstacle;