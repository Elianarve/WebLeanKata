import { useNavigate } from 'react-router-dom';
import { postObstacle, uploadImage } from '../../services/obstacleServices';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './css/Forms.css';

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
      navigate('/hypothesis');
    } catch (error) {
      console.error("Error creating obstacle:", error);
    }
  };

  return (
    <form className='form-create' onSubmit={handleSubmit(onSubmit)}>
      <h2>Obstáculo:</h2>
      <div className='items'>
        <label className='label-item'>Descripción</label>
        <input type="text" {...register('description', { required: true })} />
        {errors.description && <p className="error-message">La descripción es requerida</p>}
      </div>
      <div className='items'>
        <label className='label-item'>Archivo:</label>
        <input type="file" {...register('image', { required: false })} />
        {errors.image && <p className="error-message">Por favor adjunta un archivo</p>}
      </div>
      <button type="submit">Enviar</button>
    </form>
  )
}

export default Obstacle;
